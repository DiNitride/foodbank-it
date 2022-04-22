import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from '../../components/Modal'
import CreateReferralForm from "../../components/CreateReferralForm"
import { useSession } from "next-auth/react"

export default function Referrals({}) {
  let { data: referrals, error: errorReferrals, mutate: mutateReferrals } = useSWR('/api/referrals')
  let [ modalOpen, setModalOpen ] = useState(false)
  let { data: session, status } = useSession()

  let handleSuccess = async (e) => {
    setModalOpen(false)
    mutateReferrals()
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Referrals</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold underline text-center mb-2'>Open Referrals</h1>
        { !referrals ? <p>Loading...</p> :
        <table className='border border-collapse'>
          <thead>
            <tr>
              <th className="border">Code</th>
              <th className='border'>Assigned Name</th>
              <th className='border'>Claimed</th>
              <th className='border'>Created By</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => {
              return <tr>
                <td className='border p-2'>{ referral.Code }</td>
                <td className='border p-2'>{ referral.AssignedName }</td>
                <td className='border p-2'>{ referral.Redeemed ? 'Yes' : 'No' }</td>
                <td className='border p-2'>{ referral.UserForename } { referral.UserSurname }</td>
              </tr>
            })}
          </tbody>
        </table>
        }
        { session && session.user.admin ? <button className="mt-2" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button> : '' }
        { modalOpen ? <Modal closeModal={() => setModalOpen(false)}><CreateReferralForm onSuccess={handleSuccess} /></Modal> : ""}
      </div>
    </DashboardLayout>
  )
}
