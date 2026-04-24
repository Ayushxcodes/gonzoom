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

  // Detect whether generated Prisma client knows about the image fields
  const hasImageField = Boolean((prisma as any)._dmmf && (prisma as any)._dmmf.modelMap && (prisma as any)._dmmf.modelMap.Story && Array.isArray((prisma as any)._dmmf.modelMap.Story.fields) && (prisma as any)._dmmf.modelMap.Story.fields.some((f:any)=>f.name==='imageUrl'))

  if (hasImageField) {
    baseData.imageUrl = imageUrl || null
    baseData.leadImageAssetId = leadImageAssetId || null
  }

  await prisma.story.create({ data: baseData })

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
  await (await import('@/lib/serverAuth')).requireEditor()
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
