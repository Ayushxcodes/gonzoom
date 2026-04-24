import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            name: "Editor",
            email: credentials!.email
          }
        }

        return null
      }

    })
  ],
  // Prefer NEXTAUTH_SECRET (used by next-auth) but fall back to AUTH_SECRET
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
} as any

const handler = NextAuth(authOptions as any)

// Export handlers in a shape that the app route can destructure
export const handlers = { GET: handler as any, POST: handler as any }
export const auth = handler as any
export default handler

