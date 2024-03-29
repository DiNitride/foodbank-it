import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getOneUserByUsernameOrEmail, getUserPassword, getUserDetails } from "../../../lib/users"
import { verify } from "../../../lib/passwords"

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // console.log('= LOGIN FLOW =')
        let user = await getOneUserByUsernameOrEmail(credentials.username)
        if (!user) {
          // console.log(`No user found with username or email of ${credentials.username}`)
          return null
        }
        // console.log(`Found user ${user.UserUsername}`)
        let { UserPassword: password } = await getUserPassword(user.UserId)
        // console.log(`Got password: ${password}`)
        let passwordCorrect = await verify(password, credentials.password)
        if (passwordCorrect) return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      let id = user ? user.UserId : token.user.UserId
      let details = await getUserDetails(id)
      token.user = user ? { ...user, ...details} : { ...token.user, ...details }
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
