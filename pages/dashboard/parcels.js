import { useEffect, useState } from "react"
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'

export default function Parcels({}) {

  return (
    <Layout>
      <Head>
        <title>Parcels</title>
      </Head>
      <DashboardLayout>
        <div className='m-2 flex flex-col items-center'>
          <h1 className='text-xl font-bold'>Parcels</h1>
          
        </div>
      </DashboardLayout>
    </Layout>
  )
}