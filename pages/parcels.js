import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'

import Layout from '../components/Layout'

export default function Parcels({ parcels }) {
  return (
    <Layout>
      <Head>
        <title>Parcels</title>
      </Head>
      <div className='flex flex-col'>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  return {
    props: {
    }
  }
}
