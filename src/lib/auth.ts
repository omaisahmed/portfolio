// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcryptjs"

// const prisma = new PrismaClient()

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email
//           }
//         })

//         if (!user) {
//           return null
//         }

//         const passwordMatch = await bcrypt.compare(credentials.password, user.password)

//         if (!passwordMatch) {
//           return null
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt"
//   },
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, token }: { session: any, token: any }) {
//       if (token) {
//         session.user = session.user || {}
//         session.user.id = token.id
//         session.user.name = token.name
//         session.user.email = token.email
//       }
//       return session
//     },
//     async jwt({ token, user }: { token: any, user: any }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     }
//   }
// }

import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          throw new Error("No user found with this email.")
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) {
          throw new Error("Incorrect password.")
        }

        // Optional logging for debugging
        // console.log("Authenticated user:", user)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user = session.user || {}
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    }
  },
  debug: true // Optional: Enable to see debug logs in the console
}
