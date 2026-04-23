import { prisma } from "@/lib/prisma"

export default async function ReviewQueue(){

 let submissions: Array<{id:string,title?:string,text?:string,createdAt?:string}> = []

 // Some Prisma client setups may not expose model namespaces directly in runtime
 // (adapter or generation differences). Use $queryRaw as a safe fallback.
 if (prisma && (prisma as any).submission) {
  submissions = await (prisma as any).submission.findMany()
 } else if (prisma && typeof prisma.$queryRaw === 'function') {
  submissions = await prisma.$queryRaw`
    SELECT id, title, text, "createdAt" FROM "Submission" ORDER BY "createdAt" DESC
  ` as any
 }

 return(
  <div>

   <h1 className="text-3xl font-bold mb-4">Submission Queue</h1>

   {submissions.map((s)=>(
    <div key={s.id} className="p-4 border-b">
      <div className="font-semibold">{s.title}</div>
      <div className="text-sm text-gray-600">{s.text ?? ''}</div>
    </div>
   ))}

  </div>
 )

}
