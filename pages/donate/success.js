import Layout from '../../components/Layout'
import Head from 'next/head'
import { PaymentElement } from '@stripe/react-stripe-js'

export default function Donate() {
  return (
    <Layout>
      <Head>
        <title>Donate</title>
      </Head>
      <div className='m-2 flex justify-center'>
        <div className='p-5 text-center border rounded'>
          Thank you for your donation!
        </div>
      </div>
    </Layout>
  )
} 