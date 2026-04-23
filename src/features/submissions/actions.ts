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
