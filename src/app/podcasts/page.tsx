import { getPodcasts } from "@/features/podcasts/queries"
import type { PodcastModel } from "@/generated/prisma/models/Podcast"

export default async function PodcastsPage(){

 const podcasts = await getPodcasts()

  // Simple editorial index: latest episode featured, others in a list
  const [latest, ...previous] = podcasts

  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Podcasts</h1>

      {latest ? (
        <section className="mb-8 border p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Latest Episode</h2>
          <h3 className="text-xl font-bold mt-2">{latest.title}</h3>
          {latest.summary ? <p className="mt-2 text-gray-700">{latest.summary}</p> : null}
          <a href={`/podcasts/${latest.slug}`} className="inline-block mt-4 text-blue-600">Listen →</a>
        </section>
      ) : null}

      {previous.length > 0 ? (
        <section>
          <h3 className="text-lg font-semibold mb-4">Past Episodes</h3>
          <div className="grid grid-cols-1 gap-4">
            {previous.map((p: PodcastModel) => (
              <div key={p.id} className="p-4 border rounded">
                <div className="font-semibold">{p.title}</div>
                {p.summary ? <div className="text-sm text-gray-600">{p.summary}</div> : null}
                <a href={`/podcasts/${p.slug}`} className="text-sm text-blue-600 mt-2 inline-block">Listen →</a>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )

}
