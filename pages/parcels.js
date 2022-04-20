import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'

import Layout from '../components/Layout'
import { getAvailableParcels } from '../lib/parcels'

export default function Parcels({ parcels }) {
  return (
    <Layout>
      <Head>
        <title>Parcels</title>
      </Head>
      <div className='m-2 w-full sm:w-[600px]'>
        <h1 className='text-xl underline text-center mb-2'>Available Parcels</h1>
        <p className='my-2'>
          You can help grow this list by <Link href='/donate'><a className='underline'>donating</a></Link> financially. If you are a business that wishes to donate physically stock, please apply for a partner account.
        </p>
        { !parcels ? <p></p> : <>
          <table className='w-full text-center border border-collapse'>
            <thead>
              <tr>
                <th className='p-1 border'>Parcel ID</th>
                <th className='p-1 border'>Parcel Details</th>
              </tr>
            </thead>
            <tbody>
              { parcels.map((parcel) => (
                <tr>
                  <td className='p-1 border '>{ parcel.ParcelId }</td>
                  <td className='p-1 border text-left whitespace-pre'>{ parcel.ParcelDetails }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let parcels = await getAvailableParcels()
  return {
    props: {
      parcels: JSON.parse(JSON.stringify(parcels))
    }
  }
}
