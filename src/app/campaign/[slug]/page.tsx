import { notFound } from "next/navigation"
import { getCampaignBySlug } from "@/features/campaigns/queries"
import CampaignCard from "@/components/campaign/CampaignCard"
import Link from "next/link"

export default async function CampaignPage({ params }: { params: any }){
  const { slug } = await params

  if (!slug) return notFound()

  const campaign = await getCampaignBySlug(slug) as any

  if (!campaign) return notFound()

  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-800">Campaign Active</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
        {campaign.summary ? <p className="text-lg text-gray-700">{campaign.summary}</p> : null}
      </header>

      {/* Participation actions */}
      <section className="mb-8 grid gap-3 sm:flex sm:items-center">
        <Link href="/contribute" className="inline-block rounded bg-blue-600 px-4 py-2 text-white">Submit a lead</Link>
        <Link href="/anonymous-submit" className="inline-block rounded border px-4 py-2">Share testimony</Link>
        <button className="inline-block rounded border px-4 py-2">Follow updates</button>
      </section>

      {/* Related stories */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Coverage in this campaign</h2>
        <div className="grid grid-cols-1 gap-4">
          {campaign.relatedStories && campaign.relatedStories.length > 0 ? (
            campaign.relatedStories.map((s: any) => (
              <article key={s.id} className="border p-4 rounded">
                <h3 className="font-semibold">{s.title}</h3>
                {s.summary ? <div className="text-sm text-gray-600 mt-2">{s.summary}</div> : null}
                <Link href={`/stories/${s.slug}`} className="text-sm text-blue-600 mt-2 inline-block">Read →</Link>
              </article>
            ))
          ) : (
            <p className="text-sm text-gray-600">No related reporting yet.</p>
          )}
        </div>
      </section>

      {/* Related podcasts */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Listen to this campaign</h2>
        <div className="grid grid-cols-1 gap-4">
          {campaign.relatedPodcasts && campaign.relatedPodcasts.length > 0 ? (
            campaign.relatedPodcasts.map((p: any) => (
              <Link key={p.id} href={`/podcasts/${p.slug}`} className="block p-4 border rounded hover:bg-gray-50">
                <div className="font-semibold">{p.title}</div>
                {p.summary ? <div className="text-sm text-gray-600">{p.summary}</div> : null}
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-600">No podcast episodes tied to this campaign yet.</p>
          )}
        </div>
      </section>

      {/* Updates timeline (static starter) */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Updates</h2>
        <ol className="border-l ml-4">
          <li className="mb-4 pl-4">Launch — Campaign announced</li>
          <li className="mb-4 pl-4">Reporting update — New documents reviewed</li>
          <li className="mb-4 pl-4">Community response — Actions and reactions</li>
        </ol>
      </section>
    </main>
  )
}
