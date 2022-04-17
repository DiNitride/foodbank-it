import { useEffect, useState } from "react"
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Parcels({}) {
  let { data, error, mutate } = useSWR('/api/parcels')
  
  let handleCreate = async () => {
    let r = await fetch('/api/parcels', {
      method: 'POST'
    })
    mutate()
  }

  let handleUpdate = async () => {
    
  }

  let handleDelete = async (id) => {
    let r = await fetch(`/api/parcels/${id}`, {
      method: 'DELETE'
    })
    mutate()
  }

  return ( 
    <Layout>
      <Head>
        <title>Parcels</title>
      </Head>
      <DashboardLayout>
        <div className='m-2 flex flex-col items-center'>
          <h1 className='text-xl font-bold mb-1'>Parcels</h1>
          { !data ? <p>Loading...</p> :
          <table className='border border-collapse text-center'>
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className='border p-2'>Complete?</th>
              </tr>
            </thead>
            <tbody>
              {data.map((parcel) => {
                return <tr key={parcel.OrderId}>
                  <td className='border p-2'>{ parcel.ParcelId }</td>
                  <td className='border p-2'>{ parcel.ParcelComplete ? 'Yes' : 'No' }</td>
                  <td className='border p-2'><span className='cursor-pointer' onClick={async () => handleDelete(parcel.ParcelId)}><FontAwesomeIcon icon='trash' /></span></td>
                </tr>
              })}
            </tbody>
          </table>
          }
          <button className="mt-2" onClick={handleCreate}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
        </div>
      </DashboardLayout>
    </Layout>
  )
}
