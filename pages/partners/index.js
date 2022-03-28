import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'

import Layout from '../../components/Layout'

export default function Partners() {

  return (
    <Layout>
      <Head>
        <title>Partners</title>
      </Head>
      <div className='flex justify-center'>
        <div className='w-full md:w-[600px] p-5'>
          <h1 className='text-xl mb-3 font-semibold'>Partner Agencies</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo quam, pretium vitae urna id, sollicitudin euismod velit.
            Proin id varius orci. Sed facilisis pharetra egestas. Nam feugiat lobortis augue, sed dapibus nunc ultrices vitae.
            Vestibulum nibh nunc, molestie sit amet ultricies quis, pulvinar vel tellus. Integer molestie nunc venenatis sollicitudin rutrum.
            Cras non elit non turpis commodo semper eu quis nisi.
          </p>
          <Link href='/partners/apply'>
            <div className='cursor-pointer p-3 mt-5 rounded-xl bg-secondary text-center font-bold'>Click here for the Application Form</div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
