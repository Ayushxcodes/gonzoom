"use client"
import Link from "next/link"
import { useState } from "react"
import ContributeCTA from "@/components/shared/ContributeCTA"

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-semibold">Gonzoom</Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm">
            <Link href="/politics" className="text-slate-700">Politics</Link>
            <Link href="/region" className="text-slate-700">Region</Link>
            <Link href="/campaigns" className="text-slate-700">Campaigns</Link>
            <Link href="/podcasts" className="text-slate-700">Podcasts</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <input placeholder="Search (coming soon)" className="border rounded px-3 py-1 text-sm" />
          </div>
          <div className="hidden md:block">
            <ContributeCTA />
          </div>

          <button className="md:hidden p-2" onClick={()=>setOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
          <div className="absolute left-0 top-0 w-72 h-full bg-white p-4 shadow">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="text-lg font-semibold">Gonzoom</Link>
              <button onClick={()=>setOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link href="/categories" onClick={()=>setOpen(false)}>Categories</Link>
              <Link href="/podcasts" onClick={()=>setOpen(false)}>Podcasts</Link>
              <Link href="/campaigns" onClick={()=>setOpen(false)}>Campaigns</Link>
              <Link href="/contribute" onClick={()=>setOpen(false)}>Contribute</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
 
