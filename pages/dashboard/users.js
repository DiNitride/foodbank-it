import useSWR, { mutate } from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from '../../components/Modal'
import AdminResetPasswordForm from "../../components/AdminResetPasswordForm"
import { useSession } from "next-auth/react"

export default function Users({}) {
  let { data: users, error: errorUsers, mutate } = useSWR('/api/clients')
  let { data: session, status } = useSession()
  let [passwordResetModalOpen, setPasswordResetModalOpen] = useState()
  let [selected, setSelected] = useState(null)

  let handleDelete = async (id) => {
    let r = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    })
    if (!r.ok) {
      let { error } = await r.json()
      alert(error)
    }
    mutate()
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Users</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold underline text-center mb-2'>Users</h1>
        { !users ? <p>Loading...</p> :
        <table className='border border-collapse'>
          <thead>
            <tr>
              <th className="border">Name</th>
              <th className='border'>Phone</th>
              <th className='border'>Email</th>
              <th className='border hidden lg:table-cell' colSpan={4}>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return <tr key={user.UserId}>
                <td className='border p-2'>{ user.UserForename } { user.UserSurname }</td>
                <td className='border p-2'>{ user.ClientPhone }</td>
                <td className='border p-2'>{ user.ClientEmail }</td>
                <td className='border p-2 hidden lg:table-cell'>{ user.ClientAddressLineOne }</td>
                <td className='border p-2 hidden lg:table-cell'>{ user.ClientAddressLineTwo }</td>
                <td className='border p-2 hidden lg:table-cell'>{ user.ClientAddressTown }</td>
                <td className='border p-2 hidden lg:table-cell'>{ user.ClientAddressPostcode }</td>
                { session && session.user.admin ? <td className='border p-2 text-center cursor-pointer' onClick={() => { setSelected(user.UserId); setPasswordResetModalOpen(true) }}><FontAwesomeIcon icon='pen-to-square' /></td> : '' }
                { session && session.user.admin ? <td className='border p-2 text-center cursor-pointer' onClick={() => handleDelete(user.UserId)}><FontAwesomeIcon icon='trash' /></td> : '' }
              </tr>
            })}
          </tbody>
        </table>
        }
        { passwordResetModalOpen ? <Modal closeModal={() => setPasswordResetModalOpen(false)}><AdminResetPasswordForm userId={selected} onSuccess={() => setPasswordResetModalOpen(false)} /></Modal> : ''}
      </div>
    </DashboardLayout>
  )
}
