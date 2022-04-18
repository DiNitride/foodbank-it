import Head from "next/head";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "../../components/Modal";
import SubmitReferralForm from "../../components/SubmitReferralForm";
import OrderStatusPill from '../../components/OrderStatusPill'

export default function Orders({}) {
  let [modalOpen, setModalOpen] = useState(false)
  let { data, error, mutate } = useSWR('/api/orders')

  let handleSuccess = async () => {
    setModalOpen(false)
    await mutate()
  }

  return (
    <Layout>
      <Head>
        <title>Your Orders</title>
      </Head>
      <div className='m-2 flex justify-center'>
        <div className='flex flex-col w-[500px]'>
          <h1 className='text-xl font-bold text-center mb-2'>Your Orders</h1>
          { !data ? <p>Loading...</p> :
            <table className='border border-collapse'>
              <thead>
                <tr>
                  <th className="border">ID</th>
                  <th className='border'>Ordered By</th>
                  <th className='border'>Status</th>
                  <th className='border'>Ordered On</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => {
                  return <tr key={order.OrderId}>
                    <td className='border p-2'>{ order.OrderId }</td>
                    <td className='border p-2'>{ order.UserForename } { order.UserSurname }</td>
                    <td className='border p-2'><OrderStatusPill status={order.OrderStatus} /></td>
                    <td className='border p-2'>{ order.PrettyOrderOpened }</td>
                  </tr>
                })}
              </tbody>
            </table>
            }
            <button className="mt-2" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
            { modalOpen ? <Modal closeModal={() => setModalOpen(false)}><SubmitReferralForm onSuccess={handleSuccess} /></Modal> : ""}
        </div>
      </div>
    </Layout>
  )
}
