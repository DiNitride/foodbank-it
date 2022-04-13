import { useState, useEffect, useRef } from "react"

export default function UpdatePasswordForm({ onSuccess, onError }) {
  let [details, setDetails] = useState({
    old: '',
    new: '',
    confirm: '',
  })
  let [error, setError] = useState('')
  let inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  
  let handleChange = async (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    if (details.new !== details.confirm) {
      setError('Confirmation password does not match')
      return
    }
    
    let r = await fetch(`/api/users/${session.user.UserId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'updatePassword', payload: user }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      if (onError) {
        onError()
      } else {
        setError('An error occured whilst creating staff account')
      }
    } else {
      if (onSuccess) {
        onSuccess()
      }
    }
  }
  
  return (
    <form className='flex flex-col'>
      <label>Old Password</label>
      <input ref={inputRef} type='password' name='old' value={details.old} onChange={handleChange} className='border rounded p-1 my-1'></input>
      <label>New Password</label>
      <input type='password' name='new' value={details.new} onChange={handleChange} className='border rounded p-1 my-1'></input>
      <label>Confirm New Password</label>
      <input type='password' name='confirm' value={details.confirm} onChange={handleChange} className='border rounded p-1 my-1'></input>
      { error ? <p className='text-red-600 text-sm'>{error}</p> : ''}
      <button onClick={handleSubmit} className='p-1 mt-1 border rounded bg-secondary'>Create Account</button>
    </form>
  )
}