import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function PodcastPage({ params }: { params: any }) {
  const { slug } = await params

  if (!slug) return notFound()

  const podcast = await prisma.podcast.findUnique({ where: { slug } })

  if (!podcast) return notFound()

  return (
    <article className="p-8">
      <h1 className="text-4xl font-bold">{podcast.title}</h1>

      <p>{podcast.summary}</p>

      <audio controls className="mt-6">
        <source src={podcast.audioUrl} type="audio/mpeg" />
      </audio>
    </article>
  )
}
