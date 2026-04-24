import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SubmissionStatus } from '@/generated/prisma/enums'

export async function POST(req: Request){
  try{
    const body = await req.json()
    const title = String(body?.title || '')
    const text = String(body?.text || '')
    const leadType = String(body?.leadType || '')
    const location = String(body?.location || '')
    const name = String(body?.name || '')
    const contact = String(body?.contact || '')
    const mediaIds = Array.isArray(body?.mediaIds) ? body.mediaIds : []

    if(!text && !title) return NextResponse.json({ error: 'Missing content' }, { status: 400 })

    const created = await prisma.submission.create({ data: {
      title: title || null,
      text: text || null,
      leadType: leadType || null,
      location: location || null,
      name: name || null,
      contact: contact || null,
      status: SubmissionStatus.NEW
    }})

    if(mediaIds.length){
      await prisma.mediaAsset.updateMany({ where: { id: { in: mediaIds } }, data: { submissionId: created.id } })
    }

    return NextResponse.json({ ok: true, id: created.id })
  }catch(err){
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
