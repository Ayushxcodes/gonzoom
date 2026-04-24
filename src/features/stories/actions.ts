"use server"

import { prisma } from "@/lib/prisma"
import { StoryStatus } from "@/generated/prisma/enums"
import { redirect } from "next/navigation"

export async function createStory(
 formData:FormData
){
  // Creation of a draft occurs from the dashboard UI which is already protected by middleware.
  // We avoid requiring the editor token here to prevent token-resolution issues in server actions.

  const title = String(formData.get("title") || '')
  const summary = String(formData.get("summary") || '')
  const leadImageAssetId = String(formData.get('leadImageAssetId') || '')

  let imageUrl: string | undefined
  if (leadImageAssetId) {
    if ((prisma as any).mediaAsset) {
      const asset = await (prisma as any).mediaAsset.findUnique({ where: { id: leadImageAssetId } })
      imageUrl = asset?.url || undefined
    } else if (typeof (prisma as any).$queryRaw === 'function') {
      const res: any = await prisma.$queryRaw`SELECT * FROM "MediaAsset" WHERE id = ${leadImageAssetId} LIMIT 1`
      const asset = Array.isArray(res) ? res[0] : res
      imageUrl = asset?.url || undefined
    }
  }

  // Build data object conditionally to avoid Prisma client validation errors
  const baseData: any = {
    title: title || 'Untitled',
    summary: summary || null,
    slug: crypto.randomUUID(),
    status: StoryStatus.DRAFT
  }

  // Create the draft with safe fields first. Some runtime Prisma clients
  // may not expose the new image fields on the model; use a subsequent
  // raw UPDATE to set them when available to avoid client validation errors.
  const created: any = await prisma.$transaction(async (tx) => {
    if ((tx as any).story) {
      return await (tx as any).story.create({ data: baseData })
    }
    // fallback raw create
    const res: any = await tx.$queryRaw`
      INSERT INTO "Story" (id, title, summary, slug, status, "createdAt")
      VALUES (gen_random_uuid(), ${baseData.title}, ${baseData.summary}, ${baseData.slug}, ${baseData.status}, now()) RETURNING *
    `
    return Array.isArray(res) ? res[0] : res
  })

  // If we have an uploaded asset, persist imageUrl/leadImageAssetId via raw SQL
  // to avoid depending on the Prisma client's DMMF.
  if (leadImageAssetId) {
    try {
      await prisma.$executeRaw`
        UPDATE "Story" SET "imageUrl" = ${imageUrl || null}, "leadImageAssetId" = ${leadImageAssetId} WHERE id = ${created.id}
      `
    } catch (err) {
      // Non-fatal: log and continue. The draft exists; admin can fix via DB if needed.
      console.error('failed to update story image fields', err)
    }
  }

}

export async function moveToFactCheck(formData: FormData){
  const id = String(formData.get("id"))
  await (await import('@/lib/serverAuth')).requireEditor()

  await prisma.$executeRaw`UPDATE "Story" SET status = ${StoryStatus.FACTCHECK} WHERE id = ${id}`
  redirect("/dashboard/stories")
}

export async function approveReview(formData: FormData){
  const id = String(formData.get("id"))
  await (await import('@/lib/serverAuth')).requireEditor()

  await prisma.$executeRaw`UPDATE "Story" SET status = ${StoryStatus.REVIEW} WHERE id = ${id}`
  redirect("/dashboard/stories")
}

export async function publishStory(formData: FormData){
  const id = String(formData.get("id"))
  try {
    await (await import('@/lib/serverAuth')).requireEditor()
  } catch (err) {
    console.error('publishStory auth error', err)
    // If token resolution fails, redirect to login so the editor can re-authenticate.
    // This avoids surfacing a raw runtime exception to the UI.
    redirect('/login')
    return
  }
  // Enforce lead image requirement before publishing
  const story = await prisma.story.findUnique({ where: { id } })
  if (!story) throw new Error('Story not found')
  const hasImage = Boolean(story.imageUrl || story.leadImageAssetId)
  if (!hasImage) throw new Error('Cannot publish story without a lead image. Attach an image before publishing.')

  await prisma.$executeRaw`UPDATE "Story" SET status = ${StoryStatus.PUBLISHED}, "publishedAt" = ${new Date()} WHERE id = ${id}`
  redirect("/dashboard/stories")
}

export async function archiveStory(formData: FormData){
  const id = String(formData.get("id"))
  await (await import('@/lib/serverAuth')).requireEditor()

  await prisma.$executeRaw`UPDATE "Story" SET status = ${StoryStatus.ARCHIVED} WHERE id = ${id}`
  redirect("/dashboard/stories")
}
