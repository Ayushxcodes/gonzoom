"use client"
import FileUploadField from "./FileUploadField"
import { useState } from 'react'

export default function ContributeForm(){
  const [mediaIds, setMediaIds] = useState<string[]>([])
  const [localStatus, setLocalStatus] = useState<string | null>(null)

  function handleUploaded(asset: any){
    setMediaIds((s) => [...s, asset.id])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setLocalStatus(null)
    const formEl = e.currentTarget as HTMLFormElement
    const form = new FormData(formEl)
    const payload = {
      title: String(form.get('title') || ''),
      text: String(form.get('text') || ''),
      leadType: String(form.get('leadType') || ''),
      location: String(form.get('location') || ''),
      name: String(form.get('name') || ''),
      contact: String(form.get('contact') || ''),
      mediaIds
    }

    try{
      const res = await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if(res.ok){
        setLocalStatus('Thanks — submission received.');
        formEl.reset()
        setMediaIds([])
      } else {
        const j = await res.json()
        setLocalStatus(j?.error || 'Submission failed');
      }
    }catch(err){
      console.error(err)
      setLocalStatus('Submission failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Story Title</label>
        <input name="title" className="w-full rounded border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">What happened?</label>
        <textarea name="text" rows={6} className="w-full rounded border p-2" required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Lead type</label>
        <select name="leadType" className="w-full rounded border p-2">
          <option>Reporting Lead</option>
          <option>Witness Testimony</option>
          <option>Campaign Update</option>
          <option>Document Upload</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input name="location" className="w-full rounded border p-2" />
      </div>

      <div>
        <FileUploadField name="file" label="Optional file / evidence" onUploaded={handleUploaded} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Your name (optional)</label>
        <input name="name" className="w-full rounded border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contact (optional)</label>
        <input name="contact" className="w-full rounded border p-2" />
      </div>

      <div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </div>
      {localStatus && <div className="text-sm mt-2">{localStatus}</div>}
    </form>
  )
}
