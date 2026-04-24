import { notFound } from "next/navigation"
import { getStoriesByCategory } from "@/features/stories/queries"
import CategoryHeader from "@/components/category/CategoryHeader"
import CategoryRail from "@/components/layout/CategoryRail"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default async function CategoryPage({ params }: { params: any }){
  const { slug } = await params

  if (!slug) return notFound()

  const stories = await getStoriesByCategory(slug)

  if (!stories || stories.length === 0) return notFound()

  const [lead, ...rest] = stories

  return (
    <main className="px-6 py-12 max-w-6xl mx-auto">
      <CategoryRail />

      <CategoryHeader name={slug.charAt(0).toUpperCase() + slug.slice(1)} />

      {/* Lead story */}
      <section className="mb-8">
        <article className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-3xl font-bold">{lead.title}</h2>
            {lead.summary ? <p className="text-lg text-gray-700">{lead.summary}</p> : null}
            <Link href={`/stories/${lead.slug}`} className="inline-block mt-4 rounded bg-slate-900 px-4 py-2 text-sm text-white">Read investigation</Link>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded bg-zinc-100">{lead.podcast ? <div className="p-4">Episode: {lead.podcast.title}</div> : <div className="p-4 text-sm text-slate-500">Visual</div>}</div>
        </article>
      </section>

      {/* Grid of latest stories */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Latest Stories</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s: any) => (
            <Card key={s.id} className="p-0">
              <div className="px-4 py-3 flex gap-3 items-start">
                <div className="w-24 h-14 overflow-hidden rounded bg-zinc-100 flex-shrink-0">
                  {s.imageUrl ? <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-zinc-200" />}
                </div>
                <div>
                  <h4 className="font-semibold">{s.title}</h4>
                  {s.summary ? <div className="text-sm text-gray-600 mt-2">{s.summary}</div> : null}
                  <Link href={`/stories/${s.slug}`} className="mt-3 inline-block text-sm text-blue-600">Read →</Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Related podcasts: collect unique podcasts from stories */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Listen in this section</h3>
        <div className="grid grid-cols-1 gap-4">
          {Array.from(new Map(stories.map((s:any)=>[s.podcast?.id, s.podcast]).filter(Boolean)).values()).map((p: any) => (
            <Link key={p.id} href={`/podcasts/${p.slug}`} className="block p-4 border rounded hover:bg-gray-50">
              <div className="font-semibold">{p.title}</div>
              {p.summary ? <div className="text-sm text-gray-600">{p.summary}</div> : null}
            </Link>
          ))}
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="mt-12 bg-gray-100 p-6 rounded">
        <h3 className="text-lg font-semibold">Contribute to reporting</h3>
        <p className="text-sm text-gray-700 mb-4">Have information or a tip related to this category? Help our reporting.</p>
        <Link href="/contribute" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Contribute</Link>
      </section>
    </main>
  )
}
