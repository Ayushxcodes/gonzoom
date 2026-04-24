import { createSubmission } from "@/features/submissions/actions"

export default function ContributeForm(){
  return (
    <form action={createSubmission} className="space-y-4 max-w-xl">
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
        <label className="block text-sm font-medium mb-1">Optional file</label>
        <input name="file" type="file" className="w-full" />
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
    </form>
  )
}
