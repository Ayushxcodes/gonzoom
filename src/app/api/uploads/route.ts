import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToR2 } from '@/lib/r2'

export async function POST(req: Request){
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    const type = String(form.get('type') || 'other')
    if(!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const filename = file.name
    const mimeType = file.type || undefined
    const sizeBytes = arrayBuffer.byteLength

    // generate key
    const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2,9)}-${filename}`

    const url = await uploadToR2(arrayBuffer, key, mimeType)

    const asset = await prisma.mediaAsset.create({
      data: {
        type,
        url,
        filename,
        mimeType,
        sizeBytes: Number(sizeBytes)
      }
    })

    return NextResponse.json({ ok: true, asset })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
