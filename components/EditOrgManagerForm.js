import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect, useRef } from "react"
import useSWR from "swr"

export default function EditOrgManagerForm({ organisation, manager, onTransfer }) {
  let [error, setError] = useState('')
  let { data: staff } = useSWR(`/api/organisations/${organisation.OrganisationId}/staff`)
  let [selected, setSelected] = useState('')

  let handleChange = async (e) => {
    setSelected(e.target.value)
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (selected === '') {
      setError('Please selected a user')
      return
    }
    if (staff[selected].UserId === manager.UserId) {
      setError('You are already the manager of this organisation')
      return
    }
    let r = await fetch(`/api/organisations/${organisation.OrganisationId}`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'transferOwnership',
        payload: { newManagerId: staff[selected].UserId}
      }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
    } else {
      onTransfer()
    }
  }
  
  return (
    <form className='flex flex-col'>
      <button type='submit'>Test</button>
      <h2 className='text-center underline text-lg my-1'>Transfer Ownership for { organisation.OrganisationName }</h2>
      <p>You cannot undo this action yourself once saved!</p>
      <select className="p-2 rounded-lg my-1" value={selected} onChange={handleChange}>
        <option value='' disabled>Select User</option>
        { staff && staff.map((user, index) => <option key={user.UserId} value={index}>{ user.UserForename } { user.UserSurname }</option>)}
      </select>
      <p className='text-center text-sm text-red-500'>{ error }</p>
      <button onClick={handleSubmit} className="p-1 my-1 bg-red-500 rounded-lg font-semibold">Submit</button>
    </form>
  )
}
