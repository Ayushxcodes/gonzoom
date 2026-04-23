export default function DashboardLayout({
  children,
}:{
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">

     <aside className="w-64 border-r p-6">
       <h2 className="font-bold mb-6">
         Gonzoom CMS
       </h2>

       <nav className="space-y-4">
         <a href="/dashboard/stories">Stories</a>
         <a href="/dashboard/podcasts">Podcasts</a>
         <a href="/dashboard/submissions">Submissions</a>
       </nav>
     </aside>

     <main className="flex-1 p-8">
       {children}
     </main>

    </div>
  )
}
