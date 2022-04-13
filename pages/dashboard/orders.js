import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from '../../components/Modal'

export default function Orders({}) {
  let { data, error, mutate } = useSWR('/api/orders')

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
                <th className='border'>Ordered On</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => {
                console.log(order)
                return <tr key={order.OrderId}>
                  <td className='border p-2'>{ order.OrderId }</td>
                  <td className='border p-2'>{ order.UserForename } { order.UserSurname }</td>
                  <td className='border p-2'>{ order.OrderStatus.substring(0, 1).toUpperCase() }{ order.OrderStatus.substring(1) }</td>
                  <td className='border p-2'>{ order.PrettyOrderOpened }</td>
                </tr>
              })}
            </tbody>
          </table>
          }
        </div>
      </DashboardLayout>
    </Layout>
  )
}