import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToR2 } from '@/lib/r2'

export async function POST(req: Request){
  try {
    // Allow both editor and public uploads. If an editor session exists, note it; otherwise allow anonymous uploads.
    const { getEditorIfAny } = await import('@/lib/serverAuth')
    const editor = await getEditorIfAny()

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

    let created = null
    if (prisma && (prisma as any).mediaAsset) {
      created = await (prisma as any).mediaAsset.create({ data: { type, url, filename, mimeType, sizeBytes: Number(sizeBytes) } })
    } else if (prisma && typeof (prisma as any).$queryRaw === 'function') {
      // fallback raw insert for environments where the model client is not present
      const res: any = await prisma.$queryRaw`
        INSERT INTO "MediaAsset" ("id","type","url","filename","mimeType","sizeBytes","createdAt")
        VALUES (gen_random_uuid(), ${type}, ${url}, ${filename}, ${mimeType}, ${Number(sizeBytes)}, now()) RETURNING *
      `
      created = Array.isArray(res) ? res[0] : res
    } else {
      throw new Error('Prisma client missing mediaAsset model and raw query not available')
    }

    return NextResponse.json({ ok: true, asset: created })
  } catch (err) {
    console.error('upload error', err)
    return NextResponse.json({ error: String((err as any)?.message || err) }, { status: 500 })
  }
}
