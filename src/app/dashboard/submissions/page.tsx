import { promoteSubmission } from "@/features/submissions/actions"
import { getSubmissions } from "@/features/submissions/queries"
import Link from 'next/link'

export default async function ReviewQueue(){

 const submissions = await getSubmissions()

 return(
  <main className="p-8">
   <div className="flex justify-between mb-6">
     <h1 className="text-3xl font-bold">Submission Queue</h1>
     <Link href="/dashboard/media" className="text-sm text-blue-600">Media Library</Link>
   </div>

  {submissions.map((s: any)=>(
    <div key={s.id} className="p-4 border-b flex justify-between items-start">
      <div>
        <div className="font-semibold">{s.title}</div>
        <div className="text-sm text-gray-600">{s.text ?? ''}</div>
        <div className="text-xs text-gray-500 mt-1">Status: {s.status ?? 'NEW'}</div>
      </div>

      <div className="ml-4">
        <form action={promoteSubmission}>
          <input type="hidden" name="id" value={s.id} />
          <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm">Promote to Story</button>
        </form>
      </div>
    </div>
   ))}

  </main>
 )

}
