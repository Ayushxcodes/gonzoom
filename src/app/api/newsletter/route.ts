import { NextResponse } from 'next/server'

export async function POST(req: Request){
  try {
    const form = await req.formData()
    const email = String(form.get('email') || '')
    if(!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    // TODO: persist subscriber to DB or third-party. For now, log and return ok.
    console.log('newsletter signup', email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('newsletter error', err)
    return NextResponse.json({ error: String((err as any)?.message || err) }, { status: 500 })
  }
}
