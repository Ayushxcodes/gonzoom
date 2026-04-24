import HeroLead from "@/components/story/HeroLead";
import PodcastRail from "@/components/podcast/PodcastRail";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryRail from "@/components/layout/CategoryRail";
import CitizenVoices from "@/components/layout/CitizenVoices";
import CampaignCard from "@/components/campaign/CampaignCard";
import { getActiveCampaigns } from "@/features/campaigns/queries"
import { getStories, getStoriesByCategory } from "@/features/stories/queries"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const campaigns = await getActiveCampaigns()
  const latestStories = await getStories("PUBLISHED")
  const hero = latestStories && latestStories.length > 0 ? latestStories[0] : null
  const multimedia = latestStories.slice(0, 3)
  const regionStories = await getStoriesByCategory("region")

  // fetch latest anonymous tips
  const anonymous = prisma && (prisma as any).anonymousTip ? await (prisma as any).anonymousTip.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }) : []

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-12">
        <HeroLead title={hero?.title} summary={hero?.summary} storySlug={hero?.slug} />

        <PodcastRail />

        <section aria-labelledby="multimedia">
          <h2 id="multimedia" className="mb-6 text-2xl font-semibold">
            Multimedia Dispatches
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {multimedia.map((s: any) => (
              <article key={s.id} className="rounded border p-4">
                <a href={`/stories/${s.slug}`} className="font-semibold">{s.title}</a>
                {s.summary ? <p className="text-sm text-slate-600 mt-2">{s.summary}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <CategoryRail />

        <section aria-labelledby="region-focus">
          <h2 id="region-focus" className="mb-6 text-2xl font-semibold">
            Regional Focus
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {regionStories.slice(0,4).map((s: any) => (
              <article key={s.id} className="rounded border p-4">
                <a href={`/stories/${s.slug}`} className="font-semibold">{s.title}</a>
                {s.summary ? <p className="text-sm text-slate-600 mt-2">{s.summary}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <CitizenVoices />

        <section aria-labelledby="anonymous">
          <h2 id="anonymous" className="mb-2 text-2xl font-semibold">
            Anonymous Dispatches
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            Stories that could not be told openly.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {anonymous.map((a: any) => (
              <div key={a.id} className="rounded border p-4">
                <div className="text-sm text-slate-700">{a.message.slice(0,120)}{a.message.length>120? '…' : ''}</div>
                <div className="mt-2 text-xs text-slate-500">{new Date(a.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="campaigns">
          <h2 id="campaigns" className="mb-6 text-2xl font-semibold">
            Campaigns in Motion
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.length === 0 && <p>No active campaigns right now.</p>}
            {campaigns.map((c: any) => (
              <CampaignCard key={c.id} title={c.title} summary={c.summary} slug={c.slug} />
            ))}
          </div>
        </section>
      </main>

      
    </div>
  );
}
