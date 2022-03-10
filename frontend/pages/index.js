
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import Layout from '../components/Layout'
import UserInformation from '../components/UserInformation'
import UserList from '../components/UserList'

export default function Home({ user }) {
  let { data: session, status } = useSession()

  return (
    <Layout>
      <div>
        { session ? <div>
          <UserInformation />
          <UserList />
        </div> : <p>Please log in</p> }
      </div>
    </Layout>
  )
}

// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       user: ctx.req.cookies.token || null
//     }
//   }
// }
