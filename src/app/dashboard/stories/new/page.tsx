import { createStory } from "@/features/stories/actions"
import FileUploadField from '@/components/forms/FileUploadField'

export default function NewStory(){

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

  <FileUploadField label="Lead image (required before publish)" accept="image/*" hiddenInputName="leadImageAssetId" />

   <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
     Create Draft
   </button>

 </form>

 )

}
