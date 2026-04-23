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
