import { useState, useEffect, useRef } from "react"

export default function CreateReferralForm({ onSuccess, onError }) {
  let [name, setName] = useState('')
  let [error, setError] = useState('')
  let inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })
  
  let handleChange = async (e) => {
    setName(e.target.value)
  }

  let handleSubmit = async (e) => {
    if (name === '') {
      setError('Surname cannot be blank')
      return
    }
    let r = await fetch('/api/referrals/generate', {
      method: 'POST',
      body: JSON.stringify({ surname: name }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      if (onError) {
        onError()
      } else {
        setError('An error occured generating referral code')
      }
    } else {
      if (onSuccess) {
        onSuccess()
      }
    }
  }
  
  return (
    <form className='flex flex-col'>
      <h2 className='text-center underline text-lg'>New Referral</h2>
      <label>Referee Surname</label>
      <input ref={inputRef} type='text' value={name} onChange={handleChange} className='border rounded p-1 my-1'></input>
      { error ? <p className='text-danger text-sm'>{error}</p> : ''}
      <button onClick={handleSubmit} className='p-1 mt-1 border rounded bg-secondary'>Create Referral</button>
    </form>
  )
}
