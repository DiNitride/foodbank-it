
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'

import Layout from '../components/Layout'
import UserInformation from '../components/UserInformation'
import UserList from '../components/UserList'

export default function Home({ splash }) {
  let { data: session, status } = useSession()

  return (
    <Layout>
      <div className='flex flex-col'>
        <div className='w-full p-5'>
          <h1 className='text-xl mb-3 font-semibold'>Website Banner Text</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo quam, pretium vitae urna id, sollicitudin euismod velit.
            Proin id varius orci. Sed facilisis pharetra egestas. Nam feugiat lobortis augue, sed dapibus nunc ultrices vitae.
            Vestibulum nibh nunc, molestie sit amet ultricies quis, pulvinar vel tellus. Integer molestie nunc venenatis sollicitudin rutrum.
            Cras non elit non turpis commodo semper eu quis nisi.
          </p>
        </div>
        <div className='w-full p-5'>
          <h1 className='text-xl mb-3 font-semibold'>Partner Agencies</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo quam, pretium vitae urna id, sollicitudin euismod velit.
            Proin id varius orci. Sed facilisis pharetra egestas. Nam feugiat lobortis augue, sed dapibus nunc ultrices vitae.
            Vestibulum nibh nunc, molestie sit amet ultricies quis, pulvinar vel tellus. Integer molestie nunc venenatis sollicitudin rutrum.
            Cras non elit non turpis commodo semper eu quis nisi.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let session = await getSession(context)
  return {
    props: {
      session: session,
      splash: "This is the splash text"
    }
  }
}
