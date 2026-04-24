"use server"
import { prisma } from "@/lib/prisma"

export async function createPodcast(formData: FormData){
  const title = String(formData.get('title') || '')
  const slug = String(formData.get('slug') || '')
  const summary = String(formData.get('summary') || '')
  const audioAssetId = String(formData.get('audioAssetId') || '')

  if(!title) throw new Error('Title required')

  let audioUrl: string | undefined
  if(audioAssetId){
    const asset = await prisma.mediaAsset.findUnique({ where: { id: audioAssetId } })
    audioUrl = asset?.url || undefined
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
