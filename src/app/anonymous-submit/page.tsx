"use client"
import { useState } from "react"

export default function AnonymousSubmitPage(){
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setStatus(null)
    try{
      const res = await fetch('/api/anonymous-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      if(res.ok){
        setMessage("")
        setStatus('Thanks — your message was received.')
      } else {
        setStatus('Submission failed.')
      }
    }catch(err){
      setStatus('Submission failed.')
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Send an anonymous message</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={6} className="w-full rounded border p-2" />
        </div>
        <div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </div>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </main>
  )
}
