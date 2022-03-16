import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getOneUserByUsernameOrEmail, getUserPassword, getUserType } from "../../../lib/users"
import { verify } from "../../../lib/passwords"

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
        let user = await getOneUserByUsernameOrEmail(credentials.username)
        if (!user) return null
        let { UserPassword: password } = await getUserPassword(user.UserId)
        let passwordCorrect = await verify(password, credentials.password)
        if (passwordCorrect) return user
      }
    })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('Creating JWT')
        let type = await getUserType(user.UserId)
        console.log(type)
        token.user = { ...user, type: type }
      }
      return token
    },
    async session({ session, token, user }) {
      session.user = token.user
      return session
    }
  },
  theme: {
    colorScheme: 'light'
  }
})