import { getStories } from "@/features/stories/queries"

export default async function StoriesPage() {

 const stories = await getStories()

 return (
   <main className="p-8">
    <h1 className="text-3xl font-bold">
      Stories
    </h1>

    {stories.map((story)=>(
      <div key={story.id} className="border p-4 mt-4">
         <h2>{story.title}</h2>
         <p>{story.summary}</p>
      </div>
    ))}
   </main>
 )
}
