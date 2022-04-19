import { useEffect, useState } from "react"
import Head from 'next/head'
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"

export default function Inventory({}) {

  return (
    <DashboardLayout>
      <Head>
        <title>Inventory</title>
      </Head>
      <div className='m-2 flex flex-col items-center'>
        <h1 className='text-xl font-bold'>Inventory</h1>
        
      </div>
    </DashboardLayout>
  )
}
