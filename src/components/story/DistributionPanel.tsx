"use client"
import { useState } from "react"

type Props = {
  initial?: {
    socialCaption?: string
    newsletterSnippet?: string
    quoteText?: string
  }
}

export default function DistributionPanel({ initial }: Props){
  const [socialCaption, setSocialCaption] = useState(initial?.socialCaption || '')
  const [newsletterSnippet, setNewsletterSnippet] = useState(initial?.newsletterSnippet || '')
  const [quoteText, setQuoteText] = useState(initial?.quoteText || '')

  return (
    <div className="border rounded p-4">
      <h4 className="font-semibold mb-2">Distribution Assets</h4>
      <label className="block text-sm mb-2">Social caption (short)</label>
      <textarea value={socialCaption} onChange={(e)=>setSocialCaption(e.target.value)} className="w-full rounded border p-2 text-sm mb-3" rows={2} />

      <label className="block text-sm mb-2">Newsletter snippet</label>
      <textarea value={newsletterSnippet} onChange={(e)=>setNewsletterSnippet(e.target.value)} className="w-full rounded border p-2 text-sm mb-3" rows={3} />

      <label className="block text-sm mb-2">Quote text</label>
      <textarea value={quoteText} onChange={(e)=>setQuoteText(e.target.value)} className="w-full rounded border p-2 text-sm" rows={2} />

      <div className="mt-3 text-xs text-slate-500">These fields are saved when the editor saves the story. Automation can populate them later.</div>
    </div>
  )
}
