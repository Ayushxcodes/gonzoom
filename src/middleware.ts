import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  // Protect /dashboard/*: if no valid NextAuth token, redirect to /login
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/uploads') || pathname.startsWith('/admin')) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/login'
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"]
}
