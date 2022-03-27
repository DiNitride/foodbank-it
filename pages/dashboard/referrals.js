import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import Head from 'next/head'

export default function Users({}) {
  let { data: referrals, error: errorReferrals } = useSWR('/api/referrals')

  return (
    <Layout>
      <Head>
        <title>Referrals</title>
      </Head>
      <DashboardLayout>
        <div className='m-2 flex flex-col'>
          <h1 className='text-xl font-bold text-center mb-2'>Open Referrals</h1>
          { !referrals ? <p>Loading...</p> :
          <table className='border border-collapse'>
            <thead>
              <tr>
                <th className="border">Code</th>
                <th className='border'>Assigned Name</th>
                <th className='border'>Claimed</th>
                <th className='border'>Created By</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => {
                return <tr>
                  <td className='border p-2'>{ referral.Code }</td>
                  <td className='border p-2'>{ referral.AssignedName }</td>
                  <td className='border p-2'>{ referral.Claimed ? 'Yes' : 'No' }</td>
                  <td className='border p-2'>{ referral.UserForename } { referral.UserSurname }</td>
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