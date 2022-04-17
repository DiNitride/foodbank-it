import { useState, useEffect } from 'react'

export default function Home() {
  let [pin, setPin] = useState('')
  let [error, setError] = useState('')
  let [data, setData] = useState([])

  let handleChange = (e) => {
    setPin(e.target.value)
  }

  let loadData = async () => {
    let r = await fetch(`/api/messages?pin=${pin}`)
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
      return
    }
    let data = await r.json()
    setData(data)
    setError('')
  }

  return (
    <div>
      <div>
        <input value={pin} placeholder='Enter Pin' onChange={handleChange}></input>
        <button onClick={() => loadData()}>Load Messages</button>
      </div>
      { !data ? '' :
      data.map(message => (<div>
        <p style={{ 'textDecoration': 'underline' }}>{message.MessageTimestamp}</p>
        <p style={{ 'whiteSpace': 'pre'}}>{message.MessageValue}</p>
      </div>
      )) }
      <p>{ error }</p>
    </div>
  )
}
