"use client"

import { signIn } from "next-auth/react"

export default function Login(){

 return(

  <div className="p-8">
   <h1 className="text-2xl font-bold mb-4">Editor Sign In</h1>

   <button
    className="px-4 py-2 bg-blue-600 text-white rounded"
    onClick={() => signIn()}
   >
    Sign In
   </button>
  </div>

 )

}
