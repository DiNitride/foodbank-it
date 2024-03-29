import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

import "react-datepicker/dist/react-datepicker.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faBox, faBuilding, faCheck, faComment, faEnvelope, faFloppyDisk, faMoneyBill, faPenToSquare, faPhone, faSquareMinus, faSquarePlus, faStore, faTicket, faTrash, faUserGroup, faUserTie, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(
 faBars,
 faEnvelope,
 faPhone,
 faBuilding,
 faUserGroup,
 faBox,
 faStore,
 faSquarePlus,
 faTicket,
 faMoneyBill,
 faTrash,
 faCheck,
 faXmark,
 faPenToSquare,
 faFloppyDisk,
 faComment,
 faUserTie,
 faSquareMinus
)

function MyApp({Component, pageProps: { session, ...pageProps }}) {

  // Adapted from: https://swr.vercel.app/docs/error-handling#status-code-and-error-object
  let fetcher = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      let { error: message } = await res.json()
      let error = new Error('An error occured')
      error.info = message
      error.status = res.status
      throw error
    }

    let data = await res.json()
    return data
  }

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{
        fetcher: fetcher
      }}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
