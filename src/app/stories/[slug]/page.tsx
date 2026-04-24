import { getStoryBySlug } from "@/features/stories/queries"
import StoryHeader from "@/components/story/StoryHeader"
import PullQuote from "@/components/story/PullQuote"
import Link from "next/link"

export default async function StoryPage(
 { params }: { params: any }
){
  const { slug } = await params
  const story = await getStoryBySlug(slug, "PUBLISHED") as any

  if(!story) return <div className="p-8">Not found</div>

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* Story Header */}
      <StoryHeader title={story.title} summary={story.summary} category={story.category} publishedAt={story.publishedAt || story.createdAt} />

      {/* Lead media: podcast -> video -> image */}
      <section className="mb-8">
        {story.podcast && story.podcast.audioUrl ? (
          <div className="mb-6">
            <audio controls className="w-full">
              <source src={story.podcast.audioUrl} />
              Your browser does not support the audio element.
            </audio>
            <div className="mt-2 text-sm text-gray-600">Episode: {story.podcast.title}</div>
          </div>
        ) : story.videoUrl ? (
          <video controls className="w-full mb-6">
            <source src={story.videoUrl} />
            Sorry, your browser doesn't support embedded videos.
          </video>
        ) : story.imageUrl ? (
          // If no multimedia, show lead image
          // eslint-disable-next-line @next/next/no-img-element
          <img src={story.imageUrl} alt={story.title} className="w-full h-auto rounded mb-6" />
        ) : null}
      </section>

      {/* Body */}
      <section className="prose prose-lg max-w-none">
        {/* The project currently stores minimal story fields; render summary and placeholder longform text. */}
        {story.summary ? <p className="text-lg text-gray-800">{story.summary}</p> : null}

        <p>
          This is the longform body area — render article paragraphs here. The CMS will provide the full
          content; for now this placeholder demonstrates the editorial layout and typographic scale.
        </p>

        <p>
          Journalistic reporting benefits from clear hierarchy and generous spacing. Keep the column
          narrow, surface important facts early, and use multimedia to anchor the reader.
        </p>

        {/* Pull quote placed roughly midway */}
        <PullQuote quote={story.pullQuote || "The most important context is often the hardest to hear."} credit={story.pullQuoteCredit} />

        <p>
          Continue the body after the quote. You can add images, embeds, and rich content blocks as needed.
        </p>
      </section>

      {/* Related threads */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Related Threads</h2>
        <div className="grid grid-cols-1 gap-4">
          {story.relatedStories && story.relatedStories.length > 0 ? (
            story.relatedStories.map((rs: any) => (
              <Link key={rs.id} href={`/stories/${rs.slug}`} className="block p-4 border rounded hover:shadow">
                <div className="font-semibold">{rs.title}</div>
                {rs.summary ? <div className="text-sm text-gray-600">{rs.summary}</div> : null}
              </Link>
            ))
          ) : (
            // Fallback curated threads when none are found
            <div className="grid grid-cols-1 gap-3">
              <Link href="/stories" className="block p-4 border rounded">Identity and Policing</Link>
              <Link href="/stories" className="block p-4 border rounded">Eastern Region Conflict</Link>
              <Link href="/stories" className="block p-4 border rounded">Anonymous Testimony</Link>
            </div>
          )}
        </div>
      </section>

      {/* Campaign connection if relevant */}
      {story.campaigns && story.campaigns.length > 0 ? (
        <section className="mt-12">
          <h3 className="text-xl font-semibold mb-3">Campaign connection</h3>
          <div className="space-y-3">
            {story.campaigns.map((c: any) => (
              <Link key={c.id} href={`/campaign/${c.slug}`} className="block p-4 border rounded hover:bg-gray-50">
                <div className="font-semibold">{c.title}</div>
                {c.summary ? <div className="text-sm text-gray-600">{c.summary}</div> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Contribute / Participate CTA */}
      <section className="mt-12 bg-gray-100 p-6 rounded">
        <h3 className="text-lg font-semibold">Participate</h3>
        <p className="text-sm text-gray-700 mb-4">Have a lead? Submit testimony or help contribute reporting.</p>
        <div className="flex gap-3">
          <Link href="/anonymous-submit" className="inline-block px-4 py-2 bg-white border rounded">Submit testimony</Link>
          <Link href="/contribute" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Contribute reporting</Link>
        </div>
      </section>
    </article>
  )
}
