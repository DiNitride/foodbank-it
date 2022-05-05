import Head from 'next/head'
import DashboardLayout from "../../components/DashboardLayout";
import { getAvailableParcels, getParcels } from "../../lib/parcels";
import { getOrders } from "../../lib/orders";
import { selectFeedback } from "../../lib/feedback";
import { getUnapprovedOrganisations } from '../../lib/organisations';

export default function Dashboard({ noParcels, noAvailable, noOrders, noOpen, noReady, noClosed, unreadFeedback, noApplications }) {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className='m-2 flex flex-col items-center'>
        <h1 className='text-xl font-bold'>Dashboard</h1>
        <div className='flex flex-wrap space-2  mt-3 justify-center'>
          <div className='bg-gray-200 m-2 p-3 rounded-xl w-[300px]'>
            <h2 className='text-lg underline text-center'>Parcels</h2>
            <p>Total: <span className='font-bold'>{ noParcels }</span></p>
            <p>Available: <span className='font-bold'>{ noAvailable }</span></p>
          </div>
          <div className='bg-gray-200 m-2 p-3 rounded-xl w-[300px]'>
            <h2 className='text-lg underline text-center'>Orders</h2>
            <p>Total to Date: <span className='font-bold'>{ noOrders }</span></p>
            <p>Open: <span className='font-bold'>{ noOpen }</span></p>
            <p>Ready: <span className='font-bold'>{ noReady }</span></p>
            <p>Closed: <span className='font-bold'>{ noClosed }</span></p>
          </div>
          <div className='bg-gray-200 m-2 p-3 rounded-xl w-[300px] text-center'>
            <h2 className='text-lg underline'>Unread Feedback</h2>
            <p className='text-center text-2xl font-bold'>{ unreadFeedback }</p>
          </div>
          <div className='bg-gray-200 m-2 p-3 rounded-xl w-[300px]'>
            <h2 className='text-lg underline text-center'>Partner Applications</h2>
            <p className='text-center text-2xl font-bold'>{ noApplications }</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export async function getServerSideProps(context) {
  let parcels = await getParcels()
  let available = await getAvailableParcels()

  let orders = await getOrders()
  let open = orders.reduce((order, open) => order.OrderStatus === 'open' ? [...open, order] : open, [])
  let ready = orders.reduce((order, ready) => order.OrderStatus === 'ready' ? [...ready, order] : ready, [])
  let closed = orders.reduce((order, closed) => order.OrderStatus === 'closed' ? [...closed, order] : closed, [])

  let feedback = await selectFeedback()
  let unread = feedback.reduce((feedback, unread) => feedback.FeedbackReviewed ? unread : [...unread, feedback], [])

  let applications = await getUnapprovedOrganisations()

  return {
    props: {
      noParcels: parcels.length,
      noAvailable: available.length,
      noOrders: orders.length,
      noOpen: open.length,
      noReady: ready.length,
      noClosed: closed.length,
      unreadFeedback: unread.length,
      noApplications: applications.length
    }
  }
}
