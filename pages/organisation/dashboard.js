
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../components/Modal'
import CreateOrgStaffForm from '../../components/CreateOrgStaffForm'
import EditOrganisationDetails from '../../components/EditOrganisationDetails'

export default function Home({ }) {
  let { data: session, status } = useSession()
  let router = useRouter()
  let { data, error, mutate } = useSWR(session ? `/api/organisations/${session.user.org}` : null)
  let { data: staff, error: staffError, mutate: mutateStaff } = useSWR(session ? `/api/organisations/${session.user.org}/staff` : null)
  let [addStaffModalOpen, setAddStaffModalOpen] = useState(false)
  let [editModalOpen, setEditModalOpen] = useState(false)
  
  if (status === 'loading') {
    return (<div></div>)
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin?callbackUrl=/me')
    return (<div></div>)
  }

  if (!session.user.org) {
    router.push('/')
    return (<div></div>)
  }

  let handleDelete = async (staffId) => {
    let r = await fetch(`/api/organisations/${data.OrganisationId}/staff/${staffId}`, {
      method: 'DELETE'
    })
    if (!r.ok) {
      let { error } = await r.json()
      alert(error)
    }
    mutateStaff()
  }

  return (
    <Layout>
      <Head>
        <title>Organisation Dashboard</title>
      </Head>
      <div className='m-2 w-full sm:w-[600px]'>
        <h1 className='mb-2 text-xl underline text-center'>Organisation Dashboard - {data ? data.OrganisationName : ''}</h1>
        { !data ? <p>Loading...</p> : <>
          <p className='mb-2'>{ data.OrganisationDescription }</p>
          <h2 className='my-1 underline text-lg'>Contact <span className='ml-2 cursor-pointer' onClick={() => setEditModalOpen(true)}><FontAwesomeIcon icon='pen-to-square' /></span></h2>
          <div className='flex'>
            <div className='w-1/2'>
              <p><span className='font-semibold'>Manager:</span> { data.ManagerForename } { data.ManagerSurname }</p>
              <p><span className='font-semibold'>Email:</span> { data.OrganisationContactPhone }</p>
              <p><span className='font-semibold'>Phone:</span> { data.OrganisationContactEmail }</p>
            </div>
            <div className='w-1/2'>
              <p className='font-semibold'>Address</p>
              <p>{ data.OrganisationAddressLineOne }</p>          
              <p>{ data.OrganisationAddressLineTwo }</p>          
              <p>{ data.OrganisationAddressTown }</p>          
              <p>{ data.OrganisationAddressPostcode }</p>  
            </div>
          </div>
          <div>
            
          </div>
        </>}
        <h2 className='my-2 underline text-lg'>Staff</h2>
        <table className='w-full border border-collapse text-center'>
          <thead>
            <tr>
              <th className='p-1 border'>Staff ID</th>
              <th className='p-1 border'>Name</th>
              <th className='p-1 border'>Username</th>
            </tr>
          </thead>
          <tbody>
            { !staff ? <></> : staff.map((user) => (
              <tr key={user.UserId}>
                <td className='p-1 border'>{ user.UserId }</td>
                <td className='p-1 border'>{ user.UserForename } { user.UserSurname }</td>
                <td className='p-1 border'>{ user.UserUsername }</td>
                <td className='p-2 border cursor-pointer' onClick={() => handleDelete(user.UserId)}><FontAwesomeIcon icon='trash' /></td>
              </tr>
            )) }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}><button className="p-1" onClick={() => setAddStaffModalOpen(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button></td>
            </tr>
          </tfoot>
        </table>
        { addStaffModalOpen ? <Modal closeModal={() => setAddStaffModalOpen(false)}><CreateOrgStaffForm organisationId={data.OrganisationId} onSuccess={() => { setAddStaffModalOpen(false); mutateStaff() }} /></Modal> : ''}
        { editModalOpen ? <Modal closeModal={() => setEditModalOpen(false)}><EditOrganisationDetails organisation={data} onEdit={() => { setEditModalOpen(false); mutate(); }} /></Modal> : ''}
      </div>
    </Layout>
  )
}
