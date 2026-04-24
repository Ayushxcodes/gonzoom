
import { getStories } from "@/features/stories/queries"
import {
  moveToFactCheck,
  approveReview,
  publishStory,
  archiveStory
} from "@/features/stories/actions"

export default async function StoriesAdmin(){
 
 const drafts = await getStories("DRAFT")
 const factcheck = await getStories("FACTCHECK")
 const review = await getStories("REVIEW")
 const published = await getStories("PUBLISHED")
 const archived = await getStories("ARCHIVED")

 function Section({ title, items }: { title: string; items: any[] }){
   return (
     <section className="mb-8">
       <h2 className="text-2xl font-semibold mb-2">{title} ({items.length})</h2>
       <table className="w-full border">
         <thead>
           <tr>
             <th className="p-2 text-left">Title</th>
             <th className="p-2 text-left">Status</th>
             <th className="p-2 text-left">Actions</th>
           </tr>
         </thead>
         <tbody>
           {items.map((story)=> (
             <tr key={story.id} className="border-t">
               <td className="p-2">{story.title}</td>
               <td className="p-2">{story.status}</td>
               <td className="p-2">
                 <div className="flex gap-2">
                   <form action={moveToFactCheck}>
                     <input type="hidden" name="id" value={story.id} />
                     <button className="px-2 py-1 bg-yellow-400 rounded text-sm">Send to Fact Check</button>
                   </form>

                   <form action={approveReview}>
                     <input type="hidden" name="id" value={story.id} />
                     <button className="px-2 py-1 bg-orange-400 rounded text-sm">Approve Review</button>
                   </form>

                   { (story.imageUrl || story.leadImageAssetId) ? (
                     <form action={publishStory}>
                       <input type="hidden" name="id" value={story.id} />
                       <button className="px-2 py-1 bg-green-600 text-white rounded text-sm">Publish</button>
                     </form>
                   ) : (
                     <button disabled className="px-2 py-1 bg-gray-300 text-gray-600 rounded text-sm" title="Attach a lead image before publishing">Missing lead image</button>
                   )}

                   <form action={archiveStory}>
                     <input type="hidden" name="id" value={story.id} />
                     <button className="px-2 py-1 bg-gray-600 text-white rounded text-sm">Archive</button>
                   </form>
                 </div>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </section>
   )
 }

 return (
  <div>

   <div className="flex justify-between mb-6">
    <h1 className="text-3xl font-bold">
      Stories
    </h1>

    <a href="/dashboard/stories/new" className="text-sm text-blue-600">
      New Story
    </a>
   </div>

   <Section title="Drafts" items={drafts} />
   <Section title="Fact Check" items={factcheck} />
   <Section title="Review" items={review} />
   <Section title="Published" items={published} />
   <Section title="Archived" items={archived} />

  </div>
 )
}
