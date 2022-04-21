import { useState, useEffect, useRef } from "react"

export default function CreateStaffForm({ onSuccess, onError }) {
  let [user, setUser] = useState({
    forename: '',
    surname: '',
    password: 'password'
  })
  let [error, setError] = useState('')
  let inputRef = useRef(null)
  let validator = RegExp('^[a-zA-Z-]+$')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  
  let handleChange = async (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    if (!validator.test(user.forename)) {
      setError('Invalid Forename')
      return
    }
    if (!validator.test(user.surname)) {
      setError('Invalid Surname')
      return
    }
    let r = await fetch('/api/staff', {
      method: 'POST',
      body: JSON.stringify({ user }),
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
      <h2 className='text-lg underline text-center'>Add Staff Account</h2>
      <label>Forename</label>
      <input ref={inputRef} type='text' name='forename' value={user.forename} onChange={handleChange} className='border rounded p-1 my-1'></input>
      <label>Surname</label>
      <input type='text' name='surname' value={user.surname} onChange={handleChange} className='border rounded p-1 my-1'></input>
      { error ? <p className='text-danger text-sm'>{error}</p> : ''}
      <button onClick={handleSubmit} className='p-1 mt-1 border rounded bg-secondary'>Create Account</button>
    </form>
  )
}
