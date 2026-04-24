import { notFound } from "next/navigation"
import { getPodcastBySlug } from "@/features/podcasts/queries"
import PodcastHeader from "@/components/podcast/PodcastHeader"
import ChapterList from "@/components/podcast/ChapterList"
import Link from "next/link"

export default async function PodcastPage({ params }: { params: any }) {
  const { slug } = await params

  if (!slug) return notFound()

  const podcast = await getPodcastBySlug(slug) as any

  if (!podcast) return notFound()

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <PodcastHeader title={podcast.title} durationSec={podcast.durationSec} publishedAt={podcast.createdAt} summary={podcast.summary} />

      {/* Player */}
      <section className="mt-8 border rounded-2xl p-6">
        <audio controls className="w-full">
          <source src={podcast.audioUrl} type="audio/mpeg" />
        </audio>
      </section>

      {/* Summary */}
      {podcast.summary ? (
        <section className="mt-8 max-w-3xl prose">
          <h2 className="text-2xl font-semibold mb-2">Episode Summary</h2>
          <p>{podcast.summary}</p>
        </section>
      ) : null}

      {/* Chapters */}
      <ChapterList chapters={podcast.chapters} />

      {/* Transcript */}
      <section className="max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold mb-3">Transcript</h2>
        <div className="text-sm text-gray-800">
          {podcast.transcript ? JSON.stringify(podcast.transcript) : <p>No transcript available.</p>}
        </div>
      </section>

      {/* Related stories */}
      <section className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Related Reporting</h3>
        <div className="grid grid-cols-1 gap-4">
          {podcast.stories && podcast.stories.length > 0 ? (
            podcast.stories.map((s: any) => (
              <Link key={s.id} href={`/stories/${s.slug}`} className="block p-4 border rounded hover:bg-gray-50">
                <div className="font-semibold">{s.title}</div>
                {s.summary ? <div className="text-sm text-gray-600">{s.summary}</div> : null}
              </Link>
            ))
          ) : (
            <div className="text-sm text-gray-600">No related stories.</div>
          )}
        </div>
      </section>

      {/* Key quote (optional) */}
      <section className="mt-12 bg-gray-50 p-6 rounded">
        <h4 className="text-lg font-semibold mb-2">Key quote</h4>
        <blockquote className="text-lg">“{podcast.keyQuote || "This is a standout excerpt from the episode."}”</blockquote>
      </section>

      {/* Participate CTA */}
      <section className="mt-12 bg-gray-100 p-6 rounded">
        <h3 className="text-lg font-semibold">Have information related to this episode?</h3>
        <p className="text-sm text-gray-700 mb-4">Submit a lead or help contribute reporting.</p>
        <Link href="/contribute" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Contribute</Link>
      </section>
    </article>
  )
}
