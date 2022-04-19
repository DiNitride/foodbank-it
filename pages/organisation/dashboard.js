
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home({ }) {
  let { data: session, status } = useSession()
  let router = useRouter()
  let { data, error, mutate } = useSWR(session ? `/api/organisations/${session.user.org}` : null)
  let { data: staff, error: staffError, mutate: mutateStaff } = useSWR(session ? `/api/organisations/${session.user.org}/staff` : null)
  
  if (status === 'loading') {
    return (<div></div>)
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin?callbackUrl=/me')
    return (<div></div>)
  }

  if (!session.user.org) {
    router.push('/')
    return (<div></div>)
  }

  return (
    <Layout>
      <Head>
        <title>Organisation Dashboard</title>
      </Head>
      <div className='flex flex-col items-center'>
        <div className='max-w-[600px]'>
          <h1>Organisation</h1>
          { !data ? <p>Loading...</p> : <>
            <p>{ data.OrganisationName }</p>
          </>}
          <table className='border border-collapse text-center'>
            <thead>
              <tr>
                <th className='p-1 border'>Staff ID</th>
                <th className='p-1 border'>Name</th>
              </tr>
            </thead>
            <tbody>
              { !staff ? <></> : staff.map((user) => (
                <tr>
                  <td className='p-1 border'>{ user.UserId }</td>
                  <td className='p-1 border'>{ user.UserForename } { user.UserSurname }</td>
                  <td className='p-2 border cursor-pointer'><FontAwesomeIcon icon='trash' /></td>
                </tr>
              )) }
            </tbody>
          </table>
          <button className="mt-2" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
        </div>
      </div>
    </Layout>
  )
}
