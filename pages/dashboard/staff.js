import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'

export default function Users({}) {
  let { data: staff, error: errorStaff } = useSWR('/api/staff')

  return (
    <Layout>
      <Head>
        <title>Staff</title>
      </Head>
      <DashboardLayout>
        <div className='m-2 flex flex-col'>
          <h1 className='text-xl font-bold text-center'>Staff</h1>
          { !staff ? <p>Loading...</p> :
          <table className='border border-collapse'>
            <thead>
              <tr>
                <th className="border">Username</th>
                <th className='border'>Name</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((user) => {
                return <tr>
                  <td className='border p-2'>{ user.UserUsername }</td>
                  <td className='border p-2'>{ user.UserForename } { user.UserSurname }</td>
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