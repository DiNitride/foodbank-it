import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Home() {
  let router = useRouter()
  let [number, setNumber] = useState('')
  return (
    <div>
      <h1>SMS Numbers</h1>
      <input
        placeholder='Enter Number'
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={() => router.push('/' + number)}>Go</button>
      <h2>Quick Links</h2>
      <p><a href='/07888222111'>07888222111 - Jamie Roberts</a></p>
      <p><a href='/07111222333'>07111222333 - Samantha May</a></p>
      <p><a href='/07666555444'>07666555444 - Alex Milan</a></p>
      <p><a href='/07999333222'>07999333222 - Supplier Store Contact (John Doe)</a></p>
      <p><a href='/07888999222'>07888999222 - Social Service Contact (Richard Michaels)</a></p>
    </div>
  )
}
