import { signOut } from "next-auth/react"
import { useState } from "react"

export default function DeleteAccountForm({ user }) {
  let [error, setError] = useState('')

  let handleDelete = async () => {
    let r = await fetch(`/api/users/${user.UserId}`, {
      method: 'DELETE'
    })
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
    } else {
      signOut({ callbackUrl: '/' })
    }
  }

  return <div className="text-center">
    <h1 className="text-center text-xl underline">Delete Account?</h1>
    <p >This action CANNOT be undone</p>
    <p>Any pending orders you may have will be cancelled</p>
    <p className="my-2 font-bold">Are you sure?</p>
    <button className="bg-red-500 p-3 rounded text-white font-bold" onClick={() => handleDelete()}>Yes, delete my account</button>
  </div>
}
