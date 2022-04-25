import Head from "next/head";
import Layout from "../components/Layout";
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "../components/Modal";
import UpdatePasswordForm from "../components/UpdatePasswordForm"
import UpdateDetailsForm from "../components/UpdateDetailsForm";
import useSWR from "swr";
import DeleteAccountForm from "../components/DeleteAccountForm";
import EditOrgManagerForm from "../components/EditOrgManagerForm";
import reloadSession from '../lib/session'

export default function Me({}) {
  let { data: session, status } = useSession()
  let [passwordModalOpen, setPasswordModalOpen] = useState(false)
  let [detailsModalOpen, setDetailsModalOpen] = useState(false)
  let [deleteModalOpen, setDeleteModalOpen] = useState(false)
  let [transferOwnershipModalOpen, setTransferOwnershipModalOpen] = useState(false)
  let { data: user, error, mutate } = useSWR('/api/users/me')
  let router = useRouter()

  if (status === 'loading') {
    return (
      <div></div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin?callbackUrl=/me')
    return (<div></div>)
  }

  return (
    <Layout>
      <Head>
        <title>My Details</title>
      </Head>
      <div className='m-2 w-full sm:w-[600px]'>
        { !user ? <p>Loading...</p> : <>
          <div>
            <h1 className="text-xl text-center underline mb-2">Details for { user.UserForename }</h1>
            <p><span className='font-bold'>Name: </span>{ user.UserForename } { user.UserSurname }</p>
            { user.type === 'staff' ? <>
              <p><span className="font-bold">Account:</span> Staff Account</p>
            </> : ''}
            { user.type === 'partner' ? <>
              <p><span className='font-bold'>Account:</span> Partner Account</p>
              <p><span className="font-bold">Organisation:</span> { user.organisation.OrganisationName }</p>
              <p><span className='font-bold'>Organisation Address:</span></p>
              <p>{ user.organisation.OrganisationAddressLineOne }</p>
              <p>{ user.organisation.OrganisationAddressLineTwo }</p>
              <p>{ user.organisation.OrganisationAddressTown }</p>
              <p>{ user.organisation.OrganisationAddressPostcode }</p>
              <p><span className="font-bold">Organisaion Manager:</span> { user.manager ? 'Yes' : 'No' }</p>
            </> : ''}
            { user.type === 'client' ? <>
              <p><span className='font-bold'>Account</span>: User Account</p>
              <p><span className='font-bold'>Phone:</span> { user.contact.ClientPhone }</p>
              <p><span className='font-bold'>Email:</span> { user.contact.ClientEmail }</p>
              <p><span className='font-bold'>Address:</span></p>
              <p>{ user.contact.ClientAddressLineOne }</p>
              <p>{ user.contact.ClientAddressLineTwo }</p>
              <p>{ user.contact.ClientAddressTown }</p>
              <p>{ user.contact.ClientAddressPostcode }</p>
            </> : ''}
          </div>
          <div className='flex flex-col'>
            <h2 className='text-xl text-center underline mb-2'>Actions</h2>
            
            <button className='p-1 border rounded bg-secondary my-1' onClick={() => setDetailsModalOpen(true)}>Update Personal Details</button>
            { user.type === 'client' ? <button className='p-1 border rounded bg-secondary my-1' onClick={() => setDetailsModalOpen(true)}>Update Contact Details</button> : '' }
            <button className='p-1 border rounded bg-secondary my-1' onClick={() => setPasswordModalOpen(true)}>Update Password</button>
            { user.manager === true ? <button className='p-1 border rounded bg-secondary my-1' onClick={() => setTransferOwnershipModalOpen(true)}>Transfer Organisation Ownership</button> : '' }
            { user.type === 'client' ?<button className='p-1 border rounded bg-red-500 my-1' onClick={() => setDeleteModalOpen(true)}>Delete Account</button> : '' }
          </div>
        </> }
        
        { passwordModalOpen ? <Modal closeModal={() => setPasswordModalOpen(false)}><UpdatePasswordForm userId={user.UserId} onSuccess={() => setPasswordModalOpen(false)} /></Modal> : '' }
        { detailsModalOpen ? <Modal closeModal={() => setDetailsModalOpen(false)}><UpdateDetailsForm user={user} onSuccess={() => { setDetailsModalOpen(false); mutate() }} /></Modal> : ''}
        { deleteModalOpen ? <Modal closeModal={() => setDeleteModalOpen(false)}><DeleteAccountForm user={user} /></Modal> : ''}
        { transferOwnershipModalOpen ? <Modal closeModal={() => setTransferOwnershipModalOpen()}><EditOrgManagerForm organisation={user.organisation} manager={user} onTransfer={() => { setTransferOwnershipModalOpen(false); mutate(); reloadSession();}} /></Modal> : ''}
      </div>
    </Layout>
  )
}
