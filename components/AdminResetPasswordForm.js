import { useState } from "react"

export default function AdminResetPasswordForm({ userId, onSuccess }) {
  let [password, setPassword] = useState('')
  let [error, setError] = useState('')
  
  let handleSubmit = async () => {
    let r = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        action: 'resetPassword',
        payload: { new: password }
      }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
    } else {
      onSuccess()
    }
  }

  return (
    <form>
      <h1 className="text-center text-lg underline mb-2">Reset Users Password {userId }</h1>
      <input className="p-2 rounded-lg border mr-1" placeholder="New Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button className='p-2 rounded-lg bg-secondary ml-1' onClick={() => handleSubmit()}>Reset Password</button>
      <p className='text-sm text-danger text-center mt-2'>{ error }</p>
    </form>
  )
}
