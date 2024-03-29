import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from '../../components/Modal'
import CreateReferralForm from "../../components/CreateReferralForm"

export default function Donations({}) {
  let { data, error, mutate } = useSWR('/api/feedback')

  let handleReview = async (id) => {
    let r = await fetch(`/api/feedback/${id}`, {
      method: 'POST',
      body: JSON.stringify({ action: 'review' }),
      headers: {'Content-Type': 'application/json'}
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
        <title>Feedback</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold underline text-center mb-2'>Donations</h1>
        { !data ? <p>Loading...</p> :
        <table className='border border-collapse table-fixed'>
          <thead>
            <tr>
              <th className='border p-1'>Feedback</th>
              <th className='border p-1'>Recieved</th>
              <th className='border p-1'>Reviewed</th>
              <th className='border p-1 whitespace-nowrap'>Reviewed By</th>
            </tr>
          </thead>
          <tbody>
            { data.length !== 0 ?
            data.map((feedback) => {
              return <tr key={feedback.FeedbackId}>
                <td className='border p-2 whitespace-pre w-full'>{ feedback.FeedbackText }</td>
                <td className='border p-2 text-center w-auto whitespace-nowrap'>{ feedback.PrettyFeedbackRecieved }</td>
                <td className='border p-2 text-center w-auto whitespace-nowrap cursor-pointer' onClick={() => handleReview(feedback.FeedbackId)}><FontAwesomeIcon icon={feedback.FeedbackReviewed ? 'check' : 'xmark'} /></td>
                <td className='border p-2 text-center w-auto whitespace-nowrap'>{ feedback.UserForename } {feedback.UserSurname }</td>
              </tr>
            }) : <tr><td colSpan={5} className="text-center border">No Feedback</td></tr> }
          </tbody>
        </table>
        }
      </div>
    </DashboardLayout>
  )
}
