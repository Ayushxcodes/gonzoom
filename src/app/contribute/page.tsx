export default function Contribute(){

 return (
  <form className="max-w-xl p-8">

   <input
    placeholder="Story title"
    className="border p-2 w-full mb-4"
   />

   <textarea
    placeholder="Tell your story"
    className="border p-2 w-full h-40"
   />

   <button>
    Submit
   </button>

  </form>
 )
}
