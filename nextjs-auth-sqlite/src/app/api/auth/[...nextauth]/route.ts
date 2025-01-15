import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Initialize SQLite database
const dbPromise = open({
  filename: './mydb.sqlite',
  driver: sqlite3.Database
})

// Extending the types of user and token to include `id`
declare module "next-auth" {
  interface User {
    id: string; // Adjust based on your `id` type, could be `number` or `string`
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const db = await dbPromise
        const user = await db.get('SELECT * FROM users WHERE email = ?', [credentials.email])

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id, // Assuming `id` is a valid field in the `user` object
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
