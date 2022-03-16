import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(
 faBars
)

// https://next-auth.js.org/getting-started/example
// SWR config from https://swr.vercel.app/docs/data-fetching
function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{
        fetcher: (url) => fetch(url).then(r => r.json()) 
      }}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
