import { useEffect, useState } from "react"
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"

export default function Parcels({}) {

  return (
    <Layout>
      <DashboardLayout>
        <div className='m-2 flex flex-col items-center'>
          <h1 className='text-xl font-bold'>Parcels</h1>
          
        </div>
      </DashboardLayout>
    </Layout>
  )
}