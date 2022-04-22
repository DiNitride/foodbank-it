import { useEffect, useState } from "react"
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "../../components/Modal"
import EditParcelForm from "../../components/EditParcelForm"
import { useToggle } from "../../hooks/useToggle"

export default function Parcels({}) {
  let [modalOpen, setModalOpen] = useState(false)
  let [showUsed, toggleShowUsed] = useToggle(false)
  let { data, error, mutate } = useSWR(`/api/parcels${showUsed ? '' : '?filter=unused'}`)
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
        <h1 className='text-xl font-bold underline text-center mb-2'>Parcels</h1>
        <div className="mb-1">
          <button onClick={toggleShowUsed} className='rounded-lg bg-secondary p-1 cursor-pointer'>{ showUsed ? 'Hide Used' : 'Show Used' }</button> 
        </div>
        { !data ? <p>Loading...</p> :
        <table className='border border-collapse text-center sm:table-fixed'>
          <thead>
            <tr>
              <th className="border p-2 whitespace-nowrap sm:w-auto">ID</th>
              <th className="border p-2 whitespace-nowrap hidden md:table-cell sm:w-full">Details</th>
              <th className='border p-2 whitespace-nowrap sm:w-auto'># Items</th>
              <th className='border p-2 whitespace-nowrap sm:w-auto'>Complete?</th>
              <th className='border p-2 whitespace-nowrap sm:w-auto'>Assigned Order</th>
              <th className='border p-2 whitespace-nowrap sm:w-auto'>Parcel Used</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parcel, index) => {
              return <tr key={parcel.ParcelId} className='cursor-pointer' onClick={() => { setSelected(index); setModalOpen(true)}}>
                <td className='border p-2'>{ parcel.ParcelId }</td>
                <td className='border p-2 hidden md:table-cell text-left whitespace-pre'>{ parcel.ParcelDetails ? parcel.ParcelDetails : <div className="text-center">-</div> }</td>
                <td className='border p-2'>{ parcel.ParcelItemCount }</td>
                <td className='border p-2'>{ parcel.ParcelComplete ? 'Yes' : 'No' }</td>
                <td className='border p-2'>{ parcel.OrderId ? parcel.OrderId : '-'}</td>
                <td className='border p-2'>{ parcel.ParcelUsed ? 'Yes' : 'No'}</td>
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
