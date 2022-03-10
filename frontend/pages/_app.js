import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

// https://next-auth.js.org/getting-started/example
// SWR config from https://swr.vercel.app/docs/data-fetching
function MyApp({
  Component,
  pageProps
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{
        fetcher: (url) => fetch(url).then(r => r.json()) 
      }}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
