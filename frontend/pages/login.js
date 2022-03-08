import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import Layout from '../components/Layout'

export default function Home({ user }) {
  let [box, setBox] = useState("")

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className='m-5 flex justify-center'>
        <form className='border rounded p-2'>
          Username:
          <input></input>
          <br />
          Password:
          <input></input>
        </form>
        <p>Hello, { user }</p>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      user: ctx.req.cookies.token || null
    }
  }
}

