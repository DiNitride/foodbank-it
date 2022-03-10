import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail } from "../../../lib/users"

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // CHECKING AGAINST DB HERE !!!!!
        // console.log('Checking login details')
        // console.log(credentials)
        let u = await getUserByEmail(credentials.username)
        // console.log(u)
        // TODO: Check password
        if (u) {
          return u
        }
      }
    })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token, user }) {
      session.user = token.user
      return session
    }
  }
})