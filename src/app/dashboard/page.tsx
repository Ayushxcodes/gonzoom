export default function Dashboard(){

return(
 <main className="p-4">
   <div className="max-w-4xl mx-auto">
     <h1 className="text-2xl font-bold mb-4">Editorial Dashboard</h1>

     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
       <a href="/dashboard/stories" className="block p-4 bg-white rounded shadow hover:shadow-md">Stories</a>
       <a href="/dashboard/podcasts" className="block p-4 bg-white rounded shadow hover:shadow-md">Podcasts</a>
       <a href="/dashboard/submissions" className="block p-4 bg-white rounded shadow hover:shadow-md">Submissions</a>
     </div>
   </div>

 </main>
)

}
