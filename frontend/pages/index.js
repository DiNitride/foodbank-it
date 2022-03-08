
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import Layout from '../components/Layout'

export default function Home({ user }) {
  let { data: session, status } = useSession()
  let [userData, setUserData] = useState({})

  let loadData = async (e) => {
    console.log('Getting user information...')
    let r = await fetch('/api/users/me')
    let data = await r.json()
    console.log(data)
    setUserData(data)
  }

  return (
    <Layout>
      <div className='flex justify-center p-10'>
        <div className='text-center'>
          { session ? <p>Logged in as {session.user.forename}</p> : <p>No user session</p>}
          <table className='border m-2 p-2'>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{userData.id}</td>
              </tr>
              <tr>
                <td>Forename</td>
                <td>{userData.forename}</td>
              </tr>
              <tr>
                <td>Surname</td>
                <td>{userData.surname}</td>
              </tr>
              <tr>
                <td>Address Line 1</td>
                <td>{userData.address_line_one}</td>
              </tr>
              <tr>
                <td>Address Line 2</td>
                <td>{userData.address_line_two}</td>
              </tr>
              <tr>
                <td>Town</td>
                <td>{userData.address_city}</td>
              </tr>
              <tr>
                <td>Postcode</td>
                <td>{userData.address_postcode}</td>
              </tr>
            </tbody>
          </table>
          <button className='border rounded p-3' onClick={loadData}>Load user data</button>
        </div>
      </div>
    </Layout>
  )
}

// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       user: ctx.req.cookies.token || null
//     }
//   }
// }
