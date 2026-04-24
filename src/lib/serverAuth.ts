import { getToken } from "next-auth/jwt"
import { cookies } from "next/headers"
import { prisma } from "./prisma"

export async function requireEditor() {
  const cookieHeader = cookies().toString()
  const token = await getToken({ req: { headers: { cookie: cookieHeader } }, secret: process.env.AUTH_SECRET })
  if (!token) throw new Error('Not authenticated')

  const email = (token as any).email
  if (!email) throw new Error('Editor role required')

  // Check Editor table for explicit role membership
  if (prisma && (prisma as any).editor) {
    const ed = await (prisma as any).editor.findFirst({ where: { email } })
    if (!ed) throw new Error('Editor role required')
    return ed
  }

  // Fallback: allow if ADMIN_EMAIL matches
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL === email) return { email }

  throw new Error('Editor role required')
}

export async function getEditorIfAny(){
  try {
    const cookieHeader = cookies().toString()
    const token = await getToken({ req: { headers: { cookie: cookieHeader } }, secret: process.env.AUTH_SECRET })
    return token ? (token as any) : null
  } catch (e) {
    return null
  }
}
