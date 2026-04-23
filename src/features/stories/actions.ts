"use server"

import { prisma } from "@/lib/prisma"

export async function createStory(
 formData:FormData
){

 await prisma.story.create({
   data:{
    title: String(
      formData.get("title")
    ),

    slug: crypto.randomUUID(),

    status:"DRAFT"
   }
 })

}
