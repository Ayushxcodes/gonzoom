import { notFound } from "next/navigation"
import { getPodcastBySlug } from "@/features/podcasts/queries"

export default async function PodcastPage({ params }: { params: any }) {
  const { slug } = await params

  if (!slug) return notFound()

  const podcast = await getPodcastBySlug(slug)

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
