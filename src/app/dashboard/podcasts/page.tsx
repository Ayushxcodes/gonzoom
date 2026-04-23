import { getPodcasts } from "@/features/podcasts/queries"

export default async function PodcastsAdmin(){

 const podcasts = await getPodcasts()

 return (
  <div>

   <div className="flex justify-between mb-6">
    <h1 className="text-3xl font-bold">Podcasts</h1>
    <a href="/dashboard/podcasts/new" className="text-sm text-blue-600">New Podcast</a>
   </div>

   <table className="w-full border">
    <thead>
      <tr>
        <th className="p-2 text-left">Title</th>
        <th className="p-2 text-left">Published</th>
      </tr>
    </thead>
    <tbody>
      {podcasts.map(p=> (
        <tr key={p.id} className="border-t">
          <td className="p-2">{p.title}</td>
          <td className="p-2">{p.published ? 'Yes' : 'No'}</td>
        </tr>
      ))}
    </tbody>
   </table>

  </div>
 )
}
