"use server"
import { prisma } from "@/lib/prisma"

export async function createPodcast(formData: FormData){
  await (await import('@/lib/serverAuth')).requireEditor()

  const title = String(formData.get('title') || '')
  const slug = String(formData.get('slug') || '')
  const summary = String(formData.get('summary') || '')
  const audioAssetId = String(formData.get('audioAssetId') || '')

  if(!title) throw new Error('Title required')

  let audioUrl: string | undefined
  if(audioAssetId){
    if ((prisma as any).mediaAsset) {
      const asset = await (prisma as any).mediaAsset.findUnique({ where: { id: audioAssetId } })
      audioUrl = asset?.url || undefined
    } else if (typeof (prisma as any).$queryRaw === 'function') {
      const res: any = await prisma.$queryRaw`
        SELECT * FROM "MediaAsset" WHERE id = ${audioAssetId} LIMIT 1
      `
      const asset = Array.isArray(res) ? res[0] : res
      audioUrl = asset?.url || undefined
    }
  }

  const created = await prisma.podcast.create({
    data: {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
      summary: summary || null,
      audioUrl: audioUrl || ''
    }
  })

  return created
}
