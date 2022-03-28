import Layout from '../components/Layout'
import Head from 'next/head'

export default function Donate() {
  return (
    <Layout>
      <Head>
        <title>Donate</title>
      </Head>
      <div className='m-2 flex justify-center'>
        <h1 className='underline text-xl'>Donation Page</h1>
      </div>
    </Layout>
  )
}