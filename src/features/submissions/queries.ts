import { prisma } from "@/lib/prisma"

export async function getSubmissions(){
  if (prisma && (prisma as any).submission) {
    return await (prisma as any).submission.findMany({ orderBy: { createdAt: 'desc' } })
  }

  if (prisma && typeof prisma.$queryRaw === 'function') {
    return await prisma.$queryRaw`SELECT id, title, text, status, "createdAt" FROM "Submission" ORDER BY "createdAt" DESC` as any
  }

  return []
}
