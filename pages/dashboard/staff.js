import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "../../components/Modal"
import CreateStaffForm from "../../components/CreateStaffForm"
import AdminResetPasswordForm from "../../components/AdminResetPasswordForm"

export default function Staff({}) {
  let { data: staff, error: errorStaff, mutate } = useSWR('/api/staff')
  let [modalOpen, setModalOpen] = useState(false)
  let [passwordResetModalOpen, setPasswordResetModalOpen] = useState()
  let [selected, setSelected] = useState(null)

  let handleSuccess = async (e) => {
    setModalOpen(false)
    mutate()
  }

  let handleDelete = async (id) => {
    let r = await fetch(`/api/staff/${id}`, {
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
        <title>Staff</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold underline text-center mb-2'>Staff</h1>
        { !staff ? <p>Loading...</p> :
        <table className='border text-center border-collapse table-fixed'>
          <thead>
            <tr>
              <th className="border w-1/3">Username</th>
              <th className='border w-1/3'>Name</th>
              <th className='border w-1/3'>Admin</th>
              <th className='border w-auto' colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {staff.map((user) => {
              return <tr key={user.UserId}>
                <td className='border whitespace-nowrap p-2'>{ user.UserUsername }</td>
                <td className='border whitespace-nowrap p-2'>{ user.UserForename } { user.UserSurname }</td>
                <td className='border whitespace-nowrap p-2'>{ user.Admin ? 'Yes' : 'No' }</td>
                <td className='border p-2 text-center cursor-pointer' onClick={() => { setSelected(user.UserId); setPasswordResetModalOpen(true) }}><FontAwesomeIcon icon='pen-to-square' /></td>
                <td className='border p-2 text-center cursor-pointer' onClick={() => handleDelete(user.UserId)}><FontAwesomeIcon icon='trash' /></td>
              </tr>
            })}
          </tbody>
        </table>
        }
        <button className="mt-2" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
        { modalOpen ? <Modal closeModal={() => setModalOpen(false)}><CreateStaffForm onSuccess={handleSuccess}/></Modal> : ""}
        { passwordResetModalOpen ? <Modal closeModal={() => setPasswordResetModalOpen(false)}><AdminResetPasswordForm userId={selected} onSuccess={() => setPasswordResetModalOpen(false)} /></Modal> : ''}
      </div>
    </DashboardLayout>
  )
}
