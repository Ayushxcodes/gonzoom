import { prisma } from "@/lib/prisma"
import { StoryStatus } from "@/generated/prisma/enums"

// status optional: if provided, only return stories with that status
export async function getStories(status?: string){
  if (prisma && (prisma as any).story) {
    // Some Prisma runtime configurations validate enum inputs strictly.
    // Use a raw query for status-filtered requests to avoid enum validation errors.
    if (status && typeof prisma.$queryRaw === 'function') {
      return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE status = ${status} ORDER BY "createdAt" DESC` as any
    }

    return await (prisma as any).story.findMany({ orderBy: { createdAt: 'desc' } })
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    if (status) {
      return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE status = ${status} ORDER BY "createdAt" DESC` as any
    }

    return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" ORDER BY "createdAt" DESC` as any
  }

  return []
}

export async function getStoryBySlug(slug: string, status?: string){
  if (prisma && (prisma as any).story) {
    if (status && typeof prisma.$queryRaw === 'function') {
      const res = await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE slug = ${slug} AND status = ${status} LIMIT 1`
      return (res as any)[0]
    }

    return await (prisma as any).story.findUnique({ where: { slug } })
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    if (status) {
      const res = await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE slug = ${slug} AND status = ${status} LIMIT 1`
      return (res as any)[0]
    }

    const res = await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE slug = ${slug} LIMIT 1`
    return (res as any)[0]
  }

  return null
}
