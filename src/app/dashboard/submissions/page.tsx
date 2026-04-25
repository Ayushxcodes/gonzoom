import { promoteSubmission, rejectSubmission, addComment } from "@/features/submissions/actions"
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
    <article key={s.id} className="p-4 mb-4 bg-white rounded-lg shadow-sm border">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="font-semibold text-lg">{s.title || 'Untitled'}</div>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${s.status === 'VERIFIED' ? 'bg-green-100 text-green-800' : s.status === 'REJECTED' ? 'bg-red-100 text-red-800' : s.status === 'REVIEWING' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{s.status ?? 'NEW'}</span>
          </div>
          <div className="text-sm text-gray-600 mt-2 max-w-prose whitespace-pre-wrap break-words">{s.text ?? ''}</div>

        {s.reviewedAt && (
          <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Reviewed by: {s.reviewer ? (s.reviewer.email || s.reviewer.id) : s.reviewerId}</div>
            {s.reviewNotes && <div className="mt-1 text-sm text-gray-700">Notes: {s.reviewNotes}</div>}
            <div className="mt-1 text-xs text-gray-400">Reviewed at: {new Date(s.reviewedAt).toLocaleString()}</div>
          </div>
        )}

        {s.comments && s.comments.length > 0 && (
          <details className="mt-3 bg-gray-50 p-2 rounded">
            <summary className="text-sm font-semibold cursor-pointer">Comments ({s.comments.length})</summary>
            <div className="mt-2 space-y-2">
              {s.comments.map((c: any) => (
                <div key={c.id} className="p-2 bg-white border-l-4 border-gray-200 rounded">
                  <div className="text-xs text-gray-500">{c.author ? (c.author.email || c.author.id) : 'Unknown'} • {new Date(c.createdAt).toLocaleString()}</div>
                  <div className="text-sm text-gray-800 mt-1">{c.text}</div>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

        <div className="ml-0 md:ml-4 flex-shrink-0 flex flex-col gap-2 w-full md:w-56">
        <form action={promoteSubmission}>
          <input type="hidden" name="id" value={s.id} />
          <button
            type="submit"
            className="w-full px-3 py-2 bg-green-600 text-white rounded text-sm"
            aria-label={`Promote submission ${s.id} to story`}
            disabled={s.status === 'VERIFIED' || s.status === 'REJECTED' || !!s.reviewedAt}
          >
            Promote to Story
          </button>
        </form>

        <form action={rejectSubmission} className="flex flex-col">
          <input type="hidden" name="id" value={s.id} />
          <label className="sr-only" htmlFor={`reject-notes-${s.id}`}>Rejection notes</label>
          <textarea id={`reject-notes-${s.id}`} name="notes" placeholder="Optional rejection notes" className="mt-1 p-2 border rounded text-sm h-20" rows={3} defaultValue={s.reviewNotes ?? ''} disabled={!!s.reviewedAt || s.status === 'REJECTED'}></textarea>
          <button type="submit" className="mt-2 px-3 py-2 bg-red-600 text-white rounded text-sm" disabled={!!s.reviewedAt || s.status === 'REJECTED'}>Reject</button>
        </form>

        <form action={addComment} className="flex flex-col">
          <input type="hidden" name="submissionId" value={s.id} />
          <label className="sr-only" htmlFor={`comment-text-${s.id}`}>Comment</label>
          <textarea id={`comment-text-${s.id}`} name="text" placeholder="Add a comment or request changes" className="mt-1 p-2 border rounded text-sm h-20" rows={3}></textarea>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm">Add Comment</button>
            <button type="submit" name="type" value="change_request" className="flex-1 px-3 py-2 bg-yellow-600 text-white rounded text-sm">Request Changes</button>
          </div>
        </form>
      </div>
    </div>
    </article>
   ))}

  </main>
 )

}
