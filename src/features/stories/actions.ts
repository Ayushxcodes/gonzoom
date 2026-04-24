"use server"

import { prisma } from "@/lib/prisma"
import { StoryStatus } from "@/generated/prisma/enums"
import { redirect } from "next/navigation"

export async function createStory(
 formData:FormData
){
  await (await import('@/lib/serverAuth')).requireEditor()

  await prisma.story.create({
    data: {
      title: String(formData.get("title")),
      slug: crypto.randomUUID(),
      status: StoryStatus.DRAFT
    }
  })

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

  await prisma.$executeRaw`UPDATE "Story" SET status = ${StoryStatus.PUBLISHED}, "publishedAt" = ${new Date()} WHERE id = ${id}`
  redirect("/dashboard/stories")
}

export async function archiveStory(formData: FormData){
  const id = String(formData.get("id"))
  await (await import('@/lib/serverAuth')).requireEditor()

  await prisma.$executeRaw`UPDATE "Story" SET status = ${StoryStatus.ARCHIVED} WHERE id = ${id}`
  redirect("/dashboard/stories")
}
