import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from '../../components/Modal'
import CreateReferralForm from "../../components/CreateReferralForm"

export default function Donations({}) {
  let { data, error } = useSWR('/api/donations/stock')

  return (
    <Layout>
      <Head>
        <title>Donations</title>
      </Head>
      <DashboardLayout>
        <div className='m-2 flex flex-col'>
          <h1 className='text-xl font-bold text-center mb-2'>Donations</h1>
          { !data ? <p>Loading...</p> :
          <table className='border border-collapse'>
            <thead>
              <tr>
                <th className="border">ID</th>
                <th className='border'>Organisation</th>
                <th className='border'>User</th>
                <th className='border'>Donation</th>
              </tr>
            </thead>
            <tbody>
              { data.length !== 0 ?
              data.map((donation) => {
                return <tr>
                  <td className='border p-2 text-center'>{ donation.DonationId }</td>
                  <td className='border p-2'>{ donation.OrganisationName }</td>
                  <td className='border p-2'>{ donation.UserForename } { donation.UserSurname }</td>
                  <td className='border p-2'>{ donation.DonationText }</td>
                </tr>
              }) : <tr><td colSpan={4} className="text-center">No donations</td></tr> }
            </tbody>
          </table>
          }
        </div>
      </DashboardLayout>
    </Layout>
  )
}