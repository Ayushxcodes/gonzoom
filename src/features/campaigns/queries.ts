import { prisma } from "@/lib/prisma"

export async function getActiveCampaigns(){
  if (prisma && (prisma as any).campaign) {
    return await (prisma as any).campaign.findMany({ where: { active: true }, orderBy: { title: 'asc' } })
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    return await prisma.$queryRaw`SELECT id, title, slug, summary, active FROM "Campaign" WHERE active = true ORDER BY title ASC` as any
  }

  return []
}

export async function getCampaignBySlug(slug: string){
  if (!slug) return null

  if (prisma && (prisma as any).campaign) {
    const campaign = await (prisma as any).campaign.findUnique({ where: { slug } })

    if (!campaign) return null

    // Naive related stories: placeholder approach — find stories that mention campaign title
    const relatedStories = await (prisma as any).story.findMany({
      where: {
        OR: [
          { title: { contains: campaign.title } },
          { summary: { contains: campaign.title } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    // Related podcasts from stories' podcast relation
    const podcastIds = Array.from(new Set(relatedStories.map((s: any) => s.podcastId).filter(Boolean)))
    const relatedPodcasts = podcastIds.length > 0 ? await (prisma as any).podcast.findMany({ where: { id: { in: podcastIds } } }) : []

    return { ...campaign, relatedStories, relatedPodcasts }
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    const res = await prisma.$queryRaw`SELECT id, title, slug, summary, active FROM "Campaign" WHERE slug = ${slug} LIMIT 1`
    return (res as any)[0]
  }

  return null
}
