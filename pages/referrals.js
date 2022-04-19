import useSWR from "swr"
import DashboardLayout from "../components/DashboardLayout"
import Layout from "../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from '../components/Modal'
import CreateReferralForm from "../components/CreateReferralForm"

export default function Referrals({}) {
  let { data: referrals, error: errorReferrals, mutate: mutateReferrals } = useSWR('/api/referrals?filter=unredeemed')
  let [ modalOpen, setModalOpen ] = useState(false)

  let handleSuccess = async (e) => {
    setModalOpen(false)
    mutateReferrals()
  }

  let handleDelete = async (id) => {
    let r = await fetch(`/api/referrals/${id}`, {
      method: 'DELETE'
    })
    if (!r.ok) {
      let { error } = await r.json()
      alert(error)
    }
    mutateReferrals()
  }

  return (
    <Layout>
      <Head>
        <title>Referrals</title>
      </Head>
      <div className='m-2 w-full sm:w-[600px] flex flex-col'>
        <h1 className='text-xl font-bold text-center mb-2'>Your Referrals</h1>
        <p className="mb-0.5 text-right text-sm">*Hover to reveal name</p>
        { !referrals ? <p>Loading...</p> :
        <table className='border border-collapse text-center'>
          <thead>
            <tr>
              <th className="border">Code</th>
              <th className='border'>Assigned Name</th>
              <th className='border'>Redeemed</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => {
              return <tr key={referral.CodeId}>
                <td className='border p-2 font-mono tracking-widest'>{ referral.Code }</td>
                <td className='border p-1'><div className='p-1 rounded-xl bg-gray-300 w-full hover:bg-primary text-gray-300 hover:text-black'>{ referral.AssignedName }</div></td>
                <td className='border p-2'>{ referral.Redeemed ? 'Yes' : 'No' }</td>
                <td className='border p-2 text-center cursor-pointer' onClick={() => handleDelete(referral.CodeId)}><FontAwesomeIcon icon='trash' /></td>
              </tr>
            })}
          </tbody>
        </table>
        }
        <button className="mt-2" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
        { modalOpen ? <Modal closeModal={() => setModalOpen(false)}><CreateReferralForm onSuccess={handleSuccess} /></Modal> : ""}
      </div>
    </Layout>
  )
}
