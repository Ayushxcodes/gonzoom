import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const {
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({

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
            email: credentials.email
          }
        }

        return null
      }

    })

  ],

  secret: process.env.AUTH_SECRET

})
