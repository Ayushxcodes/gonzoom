"use server"
import { prisma } from "@/lib/prisma"
import { SubmissionStatus } from "@/generated/prisma/enums"

export async function createSubmission(formData: FormData){
  const title = String(formData.get('title') || '')
  const text = String(formData.get('text') || '')
  const leadType = String(formData.get('leadType') || '')
  const location = String(formData.get('location') || '')
  const name = String(formData.get('name') || '')
  const contact = String(formData.get('contact') || '')

  // Minimal validation
  if (!text && !title) {
    throw new Error('Submission must include text or title')
  }

  const created = await prisma.submission.create({
    data: {
      title: title || null,
      text: text || null,
      leadType: leadType || null,
      location: location || null,
      name: name || null,
      contact: contact || null,
      status: SubmissionStatus.NEW
    }
  })

  // attach any uploaded media ids to this submission
  const mediaIdsRaw = String(formData.get('mediaIds') || '')
  const mediaIds = mediaIdsRaw ? mediaIdsRaw.split(',').filter(Boolean) : []
  if(mediaIds.length){
    await prisma.mediaAsset.updateMany({
      where: { id: { in: mediaIds } },
      data: { submissionId: created.id }
    })
  }

  return created
}
export async function promoteSubmission(formData: FormData){
  const id = String(formData.get("id"))
  if (!id) return
  await (await import('@/lib/serverAuth')).requireEditor()

  const submission = await prisma.submission.findUnique({ where: { id } })
  if (!submission) return

  await prisma.story.create({
    data: {
      title: submission.title ?? 'Untitled',
      summary: submission.text ?? undefined,
      slug: crypto.randomUUID(),
      status: 'DRAFT'
    }
  })

  await prisma.submission.update({
    where: { id },
    data: { status: 'VERIFIED' }
  })
}

export async function rejectSubmission(formData: FormData){
  const id = String(formData.get("id"))
  const notes = String(formData.get("notes") || '')
  if (!id) return
  const { requireEditor } = await import('@/lib/serverAuth')
  const editor = await requireEditor()

  const reviewerId = (editor && (editor as any).id) ? (editor as any).id : null
  const now = new Date()

  await prisma.submission.update({
    where: { id },
    data: {
      status: 'REJECTED',
      reviewNotes: notes || null,
      reviewerId: reviewerId || null,
      reviewedAt: now
    }
  })

  // server actions used as form actions should return void
  return
}

export async function addComment(formData: FormData){
  const submissionId = String(formData.get('submissionId') || '')
  const text = String(formData.get('text') || '')
  const parentId = String(formData.get('parentId') || '') || null
  const makeChangeRequest = String(formData.get('type') || '') === 'change_request'

  if (!submissionId || !text) throw new Error('submissionId and text required')

  const { requireEditor } = await import('@/lib/serverAuth')
  const editor = await requireEditor()
  const authorId = (editor && (editor as any).id) ? (editor as any).id : null

  await prisma.comment.create({
    data: {
      submissionId,
      text,
      parentId: parentId || null,
      authorId: authorId || null
    }
  })

  if (makeChangeRequest) {
    await prisma.submission.update({ where: { id: submissionId }, data: { status: 'REVIEWING' } })
  }

  return
}
