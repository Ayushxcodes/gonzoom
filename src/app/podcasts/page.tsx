import { prisma } from "@/lib/prisma"

export default async function PodcastsPage(){

 const podcasts = await prisma.podcast.findMany()

 return (
  <main className="p-8">
   <h1 className="text-3xl font-bold mb-6">
     Podcasts
   </h1>

   {podcasts.map((p)=>(
    <div key={p.id} className="border p-4 mb-4">
      <h2>{p.title}</h2>
      <p>{p.summary}</p>
      <a href={`/podcasts/${p.slug}`}>
        Listen →
      </a>
    </div>
   ))}

  </main>
 )

}
