import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from '../../components/Modal'
import CreateReferralForm from "../../components/CreateReferralForm"

export default function Donations({}) {
  let { data, error } = useSWR('/api/feedback')

  return (
    <DashboardLayout>
      <Head>
        <title>Donations</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold text-center mb-2'>Donations</h1>
        { !data ? <p>Loading...</p> :
        <table className='border border-collapse table-fixed'>
          <thead>
            <tr>
              <th className='border'>Feedback</th>
              <th className='border'>Recieved</th>
            </tr>
          </thead>
          <tbody>
            { data.length !== 0 ?
            data.map((feedback) => {
              return <tr key={feedback.FeedbackId}>
                <td className='border p-2 whitespace-pre w-full'>{ feedback.FeedbackText }</td>
                <td className='border p-2 text-center w-auto whitespace-nowrap'>{ feedback.PrettyFeedbackRecieved }</td>
              </tr>
            }) : <tr><td colSpan={5} className="text-center border">No donations</td></tr> }
          </tbody>
        </table>
        }
      </div>
    </DashboardLayout>
  )
}
