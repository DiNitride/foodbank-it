import { useState, useEffect, useRef } from "react"

export default function UpdateDetailsForm({ user, onSuccess, onError }) {
  let [details, setDetails] = useState({
    forename: user.UserForename,
    surname: user.UserSurname
  })
  let [error, setError] = useState('')
  let inputRef = useRef(null)
  let validator = RegExp('^[a-zA-Z]+$')

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
    e.preventDefault()
    if (!validator.test(details.forename)) {
      setError('Invalid Forename')
      return
    }
    if (!validator.test(details.surname)) {
      setError('Invalid Forename')
      return
    }
    let r = await fetch(`/api/users/${user.UserId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'updateDetails', payload: details }),
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
        alert('User Details Saved')
        onSuccess()
      }
    }
  }
  
  return (
    <form className='flex flex-col'>
      <label>Forename</label>
      <input ref={inputRef} type='text' name='forename' value={details.forename} onChange={handleChange} className='border rounded p-1 my-1'></input>
      <label>Surname</label>
      <input type='text' name='surname' value={details.surname} onChange={handleChange} className='border rounded p-1 my-1'></input>
      { error ? <p className='text-danger text-sm text-center'>{error}</p> : ''}
      <button onClick={handleSubmit} className='p-1 mt-1 border rounded bg-secondary'>Save</button>
    </form>
  )
}
