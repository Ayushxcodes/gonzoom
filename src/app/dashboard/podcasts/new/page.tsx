import React from 'react'
import FileUploadField from '@/components/forms/FileUploadField'
import { createPodcast } from '@/features/podcasts/actions'

export default function NewPodcastPage(){
  // server component with server action form
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">New Podcast</h1>
      <form action={createPodcast} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" className="w-full rounded border p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug (optional)</label>
          <input name="slug" className="w-full rounded border p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea name="summary" rows={3} className="w-full rounded border p-2" />
        </div>

        <div>
          <FileUploadField name="file" label="Upload audio" accept="audio/*" onUploaded={(asset)=>{
            // create hidden input via DOM — server actions read form fields
            const existing = document.getElementById('audioAssetId') as HTMLInputElement | null
            if(existing) existing.value = asset.id
          }} />
          <input type="hidden" id="audioAssetId" name="audioAssetId" />
        </div>

        <div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Podcast</button>
        </div>
      </form>
    </main>
  )
}
export default function NewPodcast(){
 return (
  <form className="max-w-2xl space-y-4">

   <input name="title" placeholder="Title" className="border p-2 w-full" />

   <input name="audioUrl" placeholder="Audio URL" className="border p-2 w-full" />

   <textarea name="transcript" placeholder="Transcript" className="border p-2 w-full h-40" />

   <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create Podcast</button>

  </form>
 )
}
