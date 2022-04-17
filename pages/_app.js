import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faBox, faBuilding, faCheck, faEnvelope, faMoneyBill, faPhone, faSquarePlus, faStore, faTicket, faTrash, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons'

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
 faXmark
)

// https://next-auth.js.org/getting-started/example
// SWR config from https://swr.vercel.app/docs/data-fetching
function MyApp({Component, pageProps: { session, ...pageProps }}) {

  // https://swr.vercel.app/docs/error-handling#status-code-and-error-object
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
