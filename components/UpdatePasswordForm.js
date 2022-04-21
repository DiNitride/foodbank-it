import { useState, useEffect, useRef } from "react"

export default function UpdatePasswordForm({ userId, onSuccess, onError }) {
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
    
    let r = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'updatePassword', payload: details }),
      headers: {'Content-Type': 'application/json'}
    })
    let data = await r.json()
    if (!r.ok) {
      if (onError) {
        onError()
      } else {
        let { error } = data
        setError(error ? error : 'Something went wrong')
      }
    } else {
      if (onSuccess) {
        alert('Password updated')
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
      { error ? <p className='text-danger text-sm text-center'>{error}</p> : ''}
      <button onClick={handleSubmit} className='p-1 mt-1 border rounded bg-secondary'>Save</button>
    </form>
  )
}
