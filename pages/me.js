import Head from "next/head";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "../components/Modal";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

export default function me({}) {
  let { data: session, status } = useSession()
  let [passwordModalOpen, setPasswordModalOpen] = useState(false)
  let router = useRouter()

  if (status === 'loading') {
    return (
      <div></div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin?callbackUrl=/me')
    return (<div></div>)
  }

  let handleSuccess = async () => {
    setPasswordModalOpen(false)
  } 

  return (
    <Layout>
      <Head>
        <title>My Details</title>
      </Head>
      <div className='m-2 flex justify-center'>
        <div>
          <h1 className="text-xl">My Details</h1>
          <p>{ session.user.UserForename } { session.user.UserSurname }</p>
          <button onClick={() => setPasswordModalOpen(true)}>Update Password</button>
          { passwordModalOpen ? <Modal closeModal={() => setPasswordModalOpen(false)}><UpdatePasswordForm onSuccess={handleSuccess}/></Modal> : '' }
        </div>
      </div>
    </Layout>
  )
}