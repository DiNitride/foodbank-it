import { useEffect, useState } from "react"
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "../../components/Modal"
import EditParcelForm from "../../components/EditParcelForm"

export default function Parcels({}) {
  let [modalOpen, setModalOpen] = useState(false)
  let { data, error, mutate } = useSWR('/api/parcels?filter=unused')
  let [selected, setSelected] = useState(null)
  
  let handleCreate = async () => {
    let r = await fetch('/api/parcels', {
      method: 'POST'
    })
    mutate()
  }

  return ( 
    <DashboardLayout>
      <Head>
        <title>Available Parcels</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold mb-1 text-center'>Parcels</h1>
        { !data ? <p>Loading...</p> :
        <table className='border border-collapse text-center sm:table-fixed'>
          <thead>
            <tr>
              <th className="border p-2 sm:w-auto">ID</th>
              <th className="border p-2 sm:w-full">Details</th>
              <th className='border p-2 sm:w-auto'>Complete?</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parcel, index) => {
              return <tr key={parcel.OrderId} className='cursor-pointer' onClick={() => { setSelected(index); setModalOpen(true)}}>
                <td className='border p-2'>{ parcel.ParcelId }</td>
                <td className='border p-2 text-left whitespace-pre'>{ parcel.ParcelDetails ? parcel.ParcelDetails : <div className="text-center">-</div> }</td>
                <td className='border p-2'>{ parcel.ParcelComplete ? 'Yes' : 'No' }</td>
              </tr>
            })}
          </tbody>
        </table>
        }
        <button className="mt-2" onClick={handleCreate}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
      </div>
      { modalOpen ? <Modal closeModal={() => setModalOpen(false)}><EditParcelForm
        parcel={data[selected]}
        onDelete={() => { setModalOpen(false); mutate() }}
        onSave={() => { setModalOpen(false); mutate() }}
      /></Modal> : ''}
    </DashboardLayout>
  )
}
