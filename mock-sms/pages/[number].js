import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Home() {
  let router = useRouter()
  let { number } = router.query
  let { data, error, mutate } = useSWR(`/api/messages?number=${number}`, async (...args) => { let r = await fetch(...args); return await r.json() })

  return (
    <div>
      <a href='/'>Home</a>
      { !data ? <h1>Loading...</h1> : <>
        <h1>SMS Messages for { number }</h1>
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
