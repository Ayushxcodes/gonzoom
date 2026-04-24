"use client"
import { useState } from 'react'
import { createStory } from "@/features/stories/actions"
import FileUploadField from '@/components/forms/FileUploadField'

export default function NewStory(){
  const [leadId, setLeadId] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  return(
    <form action={createStory} className="max-w-2xl space-y-4">

      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full"
      />

      <textarea
        name="summary"
        placeholder="Summary"
        className="border p-2 w-full h-40"
      />

      <FileUploadField label="Lead image (required before publish)" accept="image/*" hiddenInputName="leadImageAssetId" onUploaded={(asset)=> setLeadId(asset?.id || null)} onUploading={(v)=> setUploading(v)} />

      {!leadId && (
        <div className="text-sm text-yellow-600">Note: You can create a draft without an image, but you'll need to attach a lead image before publishing.</div>
      )}

      <button type="submit" disabled={uploading} className={`px-4 py-2 bg-blue-600 text-white rounded ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {uploading ? 'Uploading…' : 'Create Draft'}
      </button>

    </form>
  )

}
