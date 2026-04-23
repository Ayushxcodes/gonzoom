import { prisma } from "@/lib/prisma"

export default async function StoryPage(
 { params }: {
   params:{ slug:string }
 }
){

const story = await prisma.story.findUnique({
 where:{
   slug: params.slug
 }
})

if(!story) return <div>Not found</div>

return (
 <article className="p-8">
   <h1>{story.title}</h1>
   <p>{story.summary}</p>
 </article>
)

}
