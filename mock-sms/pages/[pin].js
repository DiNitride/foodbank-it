import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Home() {
  let router = useRouter()
  let { pin } = router.query
  let { data, error, mutate } = useSWR(`/api/messages?pin=${pin}`, async (...args) => { if (!pin) return; let r = await fetch(...args); return await r.json() })

  return (
    <div>
      { !pin ? <h1>Loading...</h1> : <>
        <h1>SMS Messages for pin { pin }</h1>
        <button onClick={() => mutate()}>Refresh</button>
        { !data ? '' :
        data.map(message => (<div key={message.MessageId}>
          <p style={{ 'textDecoration': 'underline' }}>{message.PrettyMessageTimestamp}</p>
          <p style={{ 'whiteSpace': 'pre'}}>{message.MessageValue}</p>
        </div>
        )) }
        <p>{ error }</p>
      </>
      }
    </div>
  )
}
