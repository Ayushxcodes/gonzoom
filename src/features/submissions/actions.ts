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

  await prisma.submission.create({
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
}
"use server"

import { prisma } from "@/lib/prisma"

export async function promoteSubmission(formData: FormData){
  const id = String(formData.get("id"))
  if (!id) return

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
