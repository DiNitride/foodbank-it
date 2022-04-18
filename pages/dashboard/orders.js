import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from '../../components/Modal'
import { useState } from "react"
import OrderDetails from '../../components/OrderDetails'
import OrderStatusPill from "../../components/OrderStatusPill"

export default function Orders({}) {
  let { data, error, mutate } = useSWR('/api/orders')
  let [modalOpen, setModalOpen] = useState(false)
  let [selected, setSelected] = useState(null)

  let handleClick = (index) => {
    setSelected(index)
    setModalOpen(true)
  }

  return (
    <Layout>
      <Head>
        <title>Orders</title>
      </Head>
      <DashboardLayout>
        <div className='m-2 flex flex-col'>
          <h1 className='text-xl font-bold text-center mb-2'>Orders</h1>
          { !data ? <p>Loading...</p> :
          <table className='border border-collapse'>
            <thead>
              <tr>
                <th className="border">ID</th>
                <th className='border'>Ordered By</th>
                <th className='border'>Status</th>
                <th className='border'>Parcel</th>
                <th className='border'>Ordered Placed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => {
                return <tr key={order.OrderId} className='cursor-pointer' onClick={() => handleClick(index)}>
                  <td className='border p-2 text-center'>{ order.OrderId }</td>
                  <td className='border p-2'>{ order.UserForename } { order.UserSurname }</td>
                  <td className='border p-2 text-center'><OrderStatusPill status={order.OrderStatus} /></td>
                  <td className='border p-2 text-center'>{ order.OrderParcel ? `Order #${order.OrderParcel}` : '' }</td>
                  <td className='border p-2 text-center'>{ order.PrettyOrderOpened }</td>
                </tr>
              })}
            </tbody>
          </table>
          }
        </div>
        { modalOpen ? <Modal closeModal={() => setModalOpen(false)}><OrderDetails
          order={data[selected]}
          onDelete={() => { setModalOpen(false); mutate() }}
          onEdit={() => { mutate() }}
          onComplete={() => { setModalOpen(false); mutate() }}
          onClose={() => mutate()}
        /></Modal> : ''}
      </DashboardLayout>
    </Layout>
  )
}
