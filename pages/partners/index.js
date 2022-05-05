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
      <div className='m-2 w-full sm:w-[600px]'>
        <h1 className='text-xl mb-3 underline text-center'>Partner Agencies</h1>
        <p>
          Our partner organisations are what allow us to keep running properly. We accept two types of partnerships:
        </p>
        <div className='my-2'>
          <h3 className='underline text-lg'>Supporting Organisations</h3>
          <p>We work with other local organistions who support vunerable members of the community to provide our service through a referral system. For example, Citizens Advice, doctors surgeries, or social services are all organistions that we would accept referrals from. If you are an organistion that fits this description, please apply for a partner account on our referral system.</p>
        </div>
        <div className='my-2'>
          <h3 className='underline text-lg'>Supplier Organistions</h3>
          <p>We accept bulk donations of stock from local businesses. This can be surplus stock that can no longer be sold or donations from the public centralised at a donation point co-located at your business. If you would like to become a supplier partner of the foodbank, apply below.</p>
        </div>
        <Link href='/partners/apply'>
          <a className='block cursor-pointer p-3 mt-5 rounded-xl bg-secondary text-center'>Application Form</a>
        </Link>
      </div>
    </Layout>
  )
}
