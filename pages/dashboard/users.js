import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"

export default function Users({}) {
  let { data: users, error: errorUsers } = useSWR('/api/clients')

  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>
      <DashboardLayout>
        <div className='m-2 flex flex-col'>
          <h1 className='text-xl font-bold text-center'>Users</h1>
          { !users ? <p>Loading...</p> :
          <table className='border border-collapse'>
            <thead>
              <tr>
                <th className="border">Name</th>
                <th className='border'>Phone</th>
                <th className='border'>Email</th>
                <th className='border' colSpan={4}>Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                console.log(user)
                return <tr>
                  <td className='border p-2'>{ user.UserForename } { user.UserSurname }</td>
                  <td className='border p-2'>{ user.ClientPhone }</td>
                  <td className='border p-2'>{ user.ClientEmail }</td>
                  <td className='border p-2 hidden md:table-cell'>{ user.ClientAddressLineOne }</td>
                  <td className='border p-2 hidden md:table-cell'>{ user.ClientAddressLineTwo }</td>
                  <td className='border p-2 hidden md:table-cell'>{ user.ClientAddressTown }</td>
                  <td className='border p-2 hidden md:table-cell'>{ user.ClientPostcode }</td>
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