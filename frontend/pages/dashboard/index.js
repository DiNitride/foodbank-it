import Layout from "../../components/Layout";
import Link from 'next/link'
import DashboardLayout from "../../components/DashboardLayout";

export default function Dashboard({}) {
  return (
    <Layout>
      <DashboardLayout>
        <div className='m-2 flex flex-col items-center'>
          <h1 className='text-xl font-bold'>Dashboard</h1>
          
        </div>
      </DashboardLayout>
    </Layout>
  )
}