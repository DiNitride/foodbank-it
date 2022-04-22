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
    <DashboardLayout>
      <Head>
        <title>Donations</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold underline text-center mb-2'>Donations</h1>
        { !data ? <p>Loading...</p> :
        <table className='border border-collapse'>
          <thead>
            <tr>
              <th className="border">ID</th>
              <th className='border'>Organisation</th>
              <th className='border'>User</th>
              <th className='border'>Donation</th>
              <th classNAme='border'>Recieved</th>
            </tr>
          </thead>
          <tbody>
            { data.length !== 0 ?
            data.map((donation) => {
              return <tr key={donation.DonationId}>
                <td className='border p-2 text-center'>{ donation.DonationId }</td>
                <td className='border p-2'>{ donation.OrganisationName }</td>
                <td className='border p-2'>{ donation.UserForename } { donation.UserSurname }</td>
                <td className='border p-2 whitespace-pre'>{ donation.DonationText }</td>
                <td className='border p-2'>{ donation.DonationRecieved }</td>
              </tr>
            }) : <tr><td colSpan={5} className="text-center border">No donations</td></tr> }
          </tbody>
        </table>
        }
      </div>
    </DashboardLayout>
  )
}
