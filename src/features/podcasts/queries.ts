import { prisma } from "@/lib/prisma"

export async function getPodcasts(){
  if (prisma && (prisma as any).podcast) {
    return await (prisma as any).podcast.findMany()
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    return await prisma.$queryRaw`SELECT id, title, slug, summary, "audioUrl", published, "createdAt" FROM "Podcast" ORDER BY "createdAt" DESC` as any
  }

  return []
}

export async function getPodcastBySlug(slug: string){
  if (prisma && (prisma as any).podcast) {
    // Include related stories and basic fields
    const podcast = await (prisma as any).podcast.findUnique({
      where: { slug },
      include: { stories: true }
    })

    if (!podcast) return null

    // Ensure transcript and other fields are present; transcript may be JSON
    return podcast
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    const res = await prisma.$queryRaw`SELECT id, title, slug, summary, "audioUrl", published, "createdAt" FROM "Podcast" WHERE slug = ${slug} LIMIT 1`
    return (res as any)[0]
  }

  return null
}
