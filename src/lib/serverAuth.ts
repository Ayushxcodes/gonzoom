import { getToken } from "next-auth/jwt"
import { cookies, headers } from "next/headers"
import { prisma } from "./prisma"

async function buildCookieHeader() {
  try {
    const cookieStore = await cookies()
    const all = cookieStore.getAll()
    if (all && all.length > 0) {
      return all.map(c => `${c.name}=${c.value}`).join('; ')
    }

    // Fallback to headers() which may contain the cookie string in some server action contexts
    try {
      const hdr = await headers()
      const raw = hdr.get('cookie')
      return raw || ''
    } catch (e) {
      return ''
    }
  } catch (e) {
    return ''
  }
}

export async function requireEditor() {
  const cookieHeader = await buildCookieHeader()
  // Log masked cookie header and available secret flags to aid debugging.
  try {
    const show = (s: string | undefined) => s ? '[redacted]' : '[missing]'
    const short = (str: string) => (str && str.length > 200) ? str.slice(0,200) + '...': (str || '')
    console.debug('requireEditor: cookieHeader (masked):', short(cookieHeader))
    console.debug('requireEditor: has NEXTAUTH_SECRET?', Boolean(process.env.NEXTAUTH_SECRET), 'has AUTH_SECRET?', Boolean(process.env.AUTH_SECRET))
    console.debug('requireEditor: cookie includes next-auth.session-token?', cookieHeader.includes('next-auth.session-token'), 'includes __Secure-next-auth.session-token?', cookieHeader.includes('__Secure-next-auth.session-token'))
  } catch (e) {
    // ignore logging errors
  }

  // Try resolving token using either NEXTAUTH_SECRET or AUTH_SECRET.
  const secrets = [process.env.NEXTAUTH_SECRET, process.env.AUTH_SECRET].filter(Boolean)
  let token: any = null
  for (const s of (secrets.length ? secrets : [undefined])) {
    try {
      const cookiePairs = (cookieHeader || '').split(/;\s*/).filter(Boolean).map(c => {
        const idx = c.indexOf('=')
        return idx === -1 ? { name: c, value: '' } : { name: c.slice(0, idx), value: c.slice(idx + 1) }
      })
      const reqLike = {
        headers: new Headers({ cookie: cookieHeader }),
        cookies: { getAll: () => cookiePairs }
      }
      const t = await getToken({ req: reqLike as any, secret: s })
      console.debug('requireEditor: getToken attempt with secretPresent=', Boolean(s), 'returnedToken=', !!t)
      token = t
      if (token) break
    } catch (e) {
      console.error('getToken attempt failed with secret:', Boolean(s), e)
    }
  }

  if (!token) {
    console.warn('requireEditor: no token found; cookieHeader length:', String((cookieHeader || '').length))
    throw new Error('Not authenticated')
  }

  const email = (token as any).email
  if (!email) throw new Error('Editor role required')

  // Check Editor table for explicit role membership
  if (prisma && (prisma as any).editor) {
    const ed = await (prisma as any).editor.findFirst({ where: { email } })
    if (!ed) {
      // If there's no editor row, allow admin override via env var to aid local/dev workflows.
      if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL === email) return { email }
      throw new Error('Editor role required')
    }
    return ed
  }

  // Fallback: allow if ADMIN_EMAIL matches (when no Editor model is available)
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL === email) return { email }

  throw new Error('Editor role required')
}

export async function getEditorIfAny(){
  try {
    const cookieHeader = await buildCookieHeader()
    const secrets = [process.env.NEXTAUTH_SECRET, process.env.AUTH_SECRET].filter(Boolean)
    let token: any = null
    for (const s of (secrets.length ? secrets : [undefined])) {
      try {
        const cookiePairs = (cookieHeader || '').split(/;\s*/).filter(Boolean).map(c => {
          const idx = c.indexOf('=')
          return idx === -1 ? { name: c, value: '' } : { name: c.slice(0, idx), value: c.slice(idx + 1) }
        })
        const reqLike = {
          headers: new Headers({ cookie: cookieHeader }),
          cookies: { getAll: () => cookiePairs }
        }
        token = await getToken({ req: reqLike as any, secret: s })
        if (token) break
      } catch (e) {
        console.error('getEditorIfAny getToken attempt failed with secret:', Boolean(s), e)
      }
    }
    return token ? (token as any) : null
  } catch (e) {
    return null
  }
}
