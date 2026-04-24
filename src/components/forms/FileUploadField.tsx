"use client"
import React, { useState } from 'react'

type Props = {
  accept?: string
  maxBytes?: number
  onUploaded?: (asset: any) => void
  label?: string
  name?: string
}

export default function FileUploadField({ accept, maxBytes, onUploaded, label = 'Attachment', name }: Props){
  const [loading, setLoading] = useState(false)
  const [asset, setAsset] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]
    if(!file) return
    if(maxBytes && file.size > maxBytes){
      setError(`File too large (max ${maxBytes} bytes)`)
      return
    }
    setError(null)
    setLoading(true)
    try{
      const fd = new FormData()
      fd.append('file', file)
      // optional type: image/audio/doc
      const inferred = file.type.startsWith('image/') ? 'image' : file.type.startsWith('audio/') ? 'audio' : 'document'
      fd.append('type', inferred)

      const res = await fetch('/api/uploads', { method: 'POST', body: fd })
      const json = await res.json()
      if(!res.ok) throw new Error(json?.error || 'Upload failed')
      setAsset(json.asset)
      onUploaded?.(json.asset)
    }catch(err: any){
      console.error(err)
      setError(String(err.message || err))
    }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <input type="file" name={name} accept={accept} onChange={handleChange} />
      {loading && <div className="text-sm text-gray-500">Uploading…</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {asset && (
        <div className="text-sm text-gray-700">
          Uploaded: <a href={asset.url} target="_blank" rel="noreferrer" className="underline">{asset.filename || asset.url}</a>
        </div>
      )}
    </div>
  )
}
