import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth/next'
import { handlers as nextAuthHandler, auth as nextAuthHandlerExport } from '@/lib/auth'

function mask(s: string | null | undefined) {
  if (!s) return null
  return s.length > 40 ? s.slice(0, 20) + '...' + s.slice(-8) : s
}

export async function GET() {
  try {
    const hdr = await headers()
    const cookieHeader = hdr.get('cookie') || ''

    const results: any = { cookieHeaderMasked: mask(cookieHeader) }

    // Try getToken with NEXTAUTH_SECRET and AUTH_SECRET
    const secrets = [process.env.NEXTAUTH_SECRET, process.env.AUTH_SECRET].filter(Boolean)
    results.attempts = []
    for (const s of (secrets.length ? secrets : [undefined])) {
      try {
        const token = await getToken({ req: { headers: { cookie: cookieHeader } } as any, secret: s })
        results.attempts.push({ secretPresent: Boolean(s), tokenPresent: Boolean(token), tokenMasked: mask(token ? JSON.stringify(token) : null) })
      } catch (e: any) {
        results.attempts.push({ secretPresent: Boolean(s), error: String(e?.message || e) })
      }
    }

    // Try raw getToken
    try {
      const raw = await getToken({ req: { headers: { cookie: cookieHeader } } as any, secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET, raw: true })
      results.rawMasked = mask(String(raw))
      results.rawPresent = Boolean(raw)
    } catch (e: any) {
      results.rawError = String(e?.message || e)
    }

    // Try getServerSession if auth options exported
    try {
      // import auth options if available (auth.ts exports handlers only), guard the call
      // getServerSession signature in route handlers accepts (req, res, options)
      const sess = await getServerSession({ headers: () => hdr } as any, undefined as any, (await import('@/lib/auth')).authOptions as any)
      results.getServerSession = { present: Boolean(sess), sessionMasked: mask(sess ? JSON.stringify(sess) : null) }
    } catch (e: any) {
      results.getServerSessionError = String(e?.message || e)
    }

    return NextResponse.json({ ok: true, results })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) })
  }
}
