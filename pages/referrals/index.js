import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from '../../components/Modal'
import CreateReferralForm from "../../components/CreateReferralForm"

export default function Referrals({}) {
  let { data: referrals, error: errorReferrals, mutate: mutateReferrals } = useSWR('/api/referrals')
  let [ modalOpen, setModalOpen ] = useState(false)

  let handleSuccess = async (e) => {
    setModalOpen(false)
    mutateReferrals()
  }

  return (
    <Layout>
      <Head>
        <title>Referrals</title>
      </Head>
      <div className='m-2 flex justify-center'>
        <div className='w-full md:w-[600px] flex flex-col'>
          <h1 className='text-xl font-bold text-center mb-2'>Your Referrals</h1>
          { !referrals ? <p>Loading...</p> :
          <table className='border border-collapse'>
            <thead>
              <tr>
                <th className="border">Code</th>
                <th className='border'>Assigned Name</th>
                <th className='border'>Claimed</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => {
                return <tr key={referral.CodeId}>
                  <td className='border p-2'>{ referral.Code }</td>
                  <td className='border p-2'>{ referral.AssignedName }</td>
                  <td className='border p-2'>{ referral.Claimed ? 'Yes' : 'No' }</td>
                </tr>
              })}
            </tbody>
          </table>
          }
          <button className="mt-2" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
          { modalOpen ? <Modal closeModal={() => setModalOpen(false)}><CreateReferralForm onSuccess={handleSuccess} /></Modal> : ""}
        </div>
      </div>
    </Layout>
  )
}