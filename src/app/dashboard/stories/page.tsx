import { prisma } from "@/lib/prisma"

export default async function StoriesAdmin(){

 const stories = await prisma.story.findMany()

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

   <table className="w-full border">

    <thead>
      <tr>
       <th className="p-2 text-left">Title</th>
       <th className="p-2 text-left">Status</th>
      </tr>
    </thead>

    <tbody>

     {stories.map((story)=>(
      <tr key={story.id} className="border-t">
       <td className="p-2">{story.title}</td>
       <td className="p-2">{story.status}</td>
      </tr>
     ))}

    </tbody>

   </table>

  </div>
 )
}
