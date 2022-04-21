import { useState, useEffect, useRef } from "react"

export default function SubmitReferralForm({ onSuccess, onError }) {
  let [code, setCode] = useState('')
  let [error, setError] = useState('')
  let codeValidator = RegExp('^[A-Z]{0,8}$')
  let inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })
  
  let handleChange = async (e) => {
    let input = e.target.value.toUpperCase()
    if (codeValidator.test(input)) {
      setCode(input)
    }
  }

  let handleSubmit = async (e) => {
    setError('')
    if (code === '') {
      setError('Referral code cannot be blank')
      return
    }
    let r = await fetch('/api/referrals/redeem', {
      method: 'POST',
      body: JSON.stringify({ code: code }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      if (onError) {
        onError()
      } else {
        let { error } = await r.json()
        if (error) {
          setError(error)
        } else {
          setError('An error occured redeeming referral code')  
        }
      }
    } else {
      if (onSuccess) {
        onSuccess()
      }
    }
  }
  
  return (
    <form className='flex flex-col'>
      <label>Redeem Referral Code</label>
      <input ref={inputRef} type='text' value={code} onChange={handleChange} className='font-mono text-center border rounded p-1 my-1'></input>
      { error ? <p className='text-danger text-sm'>{error}</p> : ''}
      <button onClick={handleSubmit} className='p-1 mt-1 border rounded bg-secondary'>Redeem</button>
    </form>
  )
}
