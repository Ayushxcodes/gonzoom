import { prisma } from "@/lib/prisma"
import { StoryStatus } from "@/generated/prisma/enums"

// status optional: if provided, only return stories with that status
export async function getStories(status?: string){
  if (prisma && (prisma as any).story) {
    // Some Prisma runtime configurations validate enum inputs strictly.
    // Use a raw query for status-filtered requests to avoid enum validation errors.
    if (status && typeof prisma.$queryRaw === 'function') {
      return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt", "imageUrl", "leadImageAssetId" FROM "Story" WHERE status = ${status} ORDER BY "createdAt" DESC` as any
    }

    return await (prisma as any).story.findMany({ orderBy: { createdAt: 'desc' } })
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    if (status) {
      return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt", "imageUrl", "leadImageAssetId" FROM "Story" WHERE status = ${status} ORDER BY "createdAt" DESC` as any
    }

    return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt", "imageUrl", "leadImageAssetId" FROM "Story" ORDER BY "createdAt" DESC` as any
  }

  return []
}

export async function getStoryBySlug(slug: string, status?: string){
  // Guard: if slug is falsy, avoid calling Prisma with undefined
  if (!slug) return null

  // Return a single story with related data: category, podcast, related stories, campaigns
  if (prisma && (prisma as any).story) {
    // Prefer the Prisma client for relational includes
    const story = await (prisma as any).story.findUnique({
      where: { slug },
      include: {
        category: true,
        podcast: true,
      }
    })

    if (!story) return null

    // Optionally enforce status filter
    if (status && story.status !== status) return null

    // Fetch related stories via the RelatedStory join table
    const relatedLinks = await (prisma as any).relatedStory.findMany({
      where: {
        OR: [
          { fromId: story.id },
          { toId: story.id }
        ]
      },
      take: 6
    })

    const relatedIds = relatedLinks.flatMap((r: any) => {
      return [r.fromId === story.id ? r.toId : r.fromId]
    })

    const relatedStories = relatedIds.length > 0 ? await (prisma as any).story.findMany({
      where: { id: { in: relatedIds } },
      take: 6
    }) : []

    // Fetch active campaigns to show potential campaign connections
    const campaigns = await (prisma as any).campaign.findMany({ where: { active: true }, take: 3 })

    return { ...story, relatedStories, campaigns }
  }

  // Fallback to raw queries when prisma client delegates are not available
  if (prisma && typeof prisma.$queryRaw === 'function') {
    const res = await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE slug = ${slug} LIMIT 1`
    return (res as any)[0]
  }

  return null
}

export async function getStoriesByCategory(slug: string){
  if (!slug) return []

  if (prisma && (prisma as any).story) {
    return await (prisma as any).story.findMany({
      where: {
        status: StoryStatus.PUBLISHED,
        // Category model uses `name` (no `slug` field in schema), match by name here
        category: { is: { name: slug } }
      },
      include: { category: true, podcast: true },
      orderBy: { createdAt: 'desc' }
    })
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    return await prisma.$queryRaw`SELECT id, title, slug, summary, status, "createdAt" FROM "Story" WHERE status = ${"PUBLISHED"} LIMIT 50` as any
  }

  return []
}
