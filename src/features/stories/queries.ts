import { prisma } from "@/lib/prisma"

export async function getStories(){
  if (prisma && (prisma as any).story) {
    return await (prisma as any).story.findMany()
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" ORDER BY "createdAt" DESC` as any
  }

  return []
}

export async function getStoryBySlug(slug: string){
  if (prisma && (prisma as any).story) {
    return await (prisma as any).story.findUnique({ where: { slug } })
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    const res = await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE slug = ${slug} LIMIT 1`
    return (res as any)[0]
  }

  return null
}
