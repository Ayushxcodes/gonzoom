"use client"
import { useState } from "react"

export default function ShareBlock({ url, title }: { url?: string, title?: string }){
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  async function copyLink(){
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(()=>setCopied(false),2000)
    } catch (e) {
      console.error('copy failed', e)
    }
  }

  const encoded = encodeURIComponent(shareUrl)
  const text = encodeURIComponent(title || '')

  return (
    <div className="flex items-center gap-3">
      <button onClick={copyLink} className="rounded border px-3 py-1 text-sm">{copied ? 'Copied' : 'Copy link'}</button>
      <a className="rounded border px-3 py-1 text-sm" href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`} target="_blank" rel="noreferrer">Twitter</a>
      <a className="rounded border px-3 py-1 text-sm" href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noreferrer">Facebook</a>
      <a className="rounded border px-3 py-1 text-sm" href={`https://united.to/share?text=${text}&url=${encoded}`} target="_blank" rel="noreferrer">Threads</a>
      <a className="rounded border px-3 py-1 text-sm" href={`https://mastodon.social/share?text=${text}%20${encoded}`} target="_blank" rel="noreferrer">Mastodon</a>
    </div>
  )
}
