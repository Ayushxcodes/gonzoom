"use client"

import { useState } from "react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}:{
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">

     <aside className={`w-64 border-r p-6 bg-white fixed inset-y-0 left-0 transform transition-transform z-40 md:relative md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
       <div className="flex items-center justify-between mb-6">
         <h2 className="font-bold">Gonzoom CMS</h2>
         <button className="md:hidden text-gray-600" onClick={()=>setOpen(false)} aria-label="Close sidebar">✕</button>
       </div>

       <nav className="space-y-3">
         <Link href="/dashboard/stories" className="block text-gray-800 hover:text-blue-600">Stories</Link>
         <Link href="/dashboard/podcasts" className="block text-gray-800 hover:text-blue-600">Podcasts</Link>
         <Link href="/dashboard/submissions" className="block text-gray-800 hover:text-blue-600">Submissions</Link>
       </nav>
     </aside>

     <div className="flex-1 md:pl-64">
       <header className="flex items-center justify-between p-4 border-b bg-white">
         <div className="flex items-center gap-3">
           <button className="md:hidden text-2xl" onClick={()=>setOpen(true)} aria-label="Open sidebar">☰</button>
           <h1 className="text-lg font-semibold">Dashboard</h1>
         </div>
         <div>
           <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">View site</Link>
         </div>
       </header>

       <main className="p-6">
         {children}
       </main>
     </div>

    </div>
  )
}
