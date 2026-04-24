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
          <FileUploadField name="file" label="Upload audio" accept="audio/*" hiddenInputName="audioAssetId" />
        </div>

        <div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Podcast</button>
        </div>
      </form>
    </main>
  )
}

