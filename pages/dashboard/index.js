import Layout from "../../components/Layout";
import Link from 'next/link'
import Head from 'next/head'
import DashboardLayout from "../../components/DashboardLayout";
import useSWR from "swr";

export default function Dashboard({}) {
  let {data, error, mutate } = useSWR('/api/statistics')

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className='m-2 flex flex-col items-center'>
        <h1 className='text-xl font-bold'>Dashboard</h1>
        { !data ? <p>Loading</p> : <>
          <p>{ data.success ? 'Loaded' : '' }</p>
        </>}
      </div>
    </DashboardLayout>
  )
}
