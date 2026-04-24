import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function SubmissionsAdmin(){
  const subs = await prisma.submission.findMany({ orderBy: { createdAt: 'desc' } })

  // load attachments per submission
  const media = await prisma.mediaAsset.findMany({ where: { submissionId: { in: subs.map(s=>s.id) } } })
  const bySub: Record<string, any[]> = {}
  media.forEach(m => { bySub[m.submissionId || ''] = bySub[m.submissionId || ''] || []; bySub[m.submissionId || ''].push(m) })

  return (
    <main className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Submissions</h1>
        <Link href="/dashboard/media" className="text-sm text-blue-600">Media Library</Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 text-left">Title / Text</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Attachments</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {subs.map(s => (
            <tr key={s.id} className="border-t align-top">
              <td className="p-2 max-w-md">
                <div className="font-semibold">{s.title || '—'}</div>
                <div className="text-sm text-gray-700">{s.text?.slice(0,200)}</div>
              </td>
              <td className="p-2">{s.status}</td>
              <td className="p-2">
                {(bySub[s.id] || []).length ? (
                  (bySub[s.id] || []).map(a => (
                    <div key={a.id} className="mb-2">
                      {a.mimeType?.startsWith('image/') ? (
                        <img src={a.url} alt={a.filename} className="w-40 h-auto border" />
                      ) : (
                        <a href={a.url} target="_blank" rel="noreferrer" className="underline">{a.filename || a.url}</a>
                      )}
                    </div>
                  ))
                ) : '-'}
              </td>
              <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
import { promoteSubmission } from "@/features/submissions/actions"
import { getSubmissions } from "@/features/submissions/queries"

export default async function ReviewQueue(){

 const submissions = await getSubmissions()

 return(
  <div>

   <h1 className="text-3xl font-bold mb-4">Submission Queue</h1>

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

  </div>
 )

}
