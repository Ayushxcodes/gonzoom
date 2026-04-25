import { prisma } from "@/lib/prisma"

export async function getSubmissions(){
  if (prisma && (prisma as any).submission) {
    try {
      return await (prisma as any).submission.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          reviewer: true,
          comments: { orderBy: { createdAt: 'asc' }, include: { author: true } }
        }
      })
    } catch (e) {
      // Fallback for environments where the generated client hasn't been updated yet
      console.warn('getSubmissions: include(reviewer|comments) failed, falling back to plain findMany', e)
      return await (prisma as any).submission.findMany({ orderBy: { createdAt: 'desc' } })
    }
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    return await prisma.$queryRaw`SELECT id, title, text, status, "createdAt" FROM "Submission" ORDER BY "createdAt" DESC` as any
  }

  return []
}
