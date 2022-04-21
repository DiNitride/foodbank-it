import { useState } from "react"

export default function EditOrganisationDetails({ organisation, onEdit, onError }) {
  let [details, setDetails] = useState({
    description: organisation.OrganisationDescription,
    email: organisation.OrganisationContactEmail,
    phone: organisation.OrganisationContactPhone
  })
  let validators ={
    description: RegExp('[a-zA-Z\\s:!?-_]+'),
    email: RegExp('^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-_.]+\\.[a-zA-Z]+$'),
    phone: RegExp('^[0-9]{10,11}$')
  }
  let [error, setError] = useState('')

  let handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    let invalidFields = []
    for (let [fieldName, fieldValue] of Object.entries(details)) {
      if (!validators[fieldName].test(fieldValue)) {
        invalidFields.push(`${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`)
      }
    }
    if (invalidFields.length > 0) {
      setError(`Invalid Fields: ${invalidFields.join(', ')}`)
      return
    }

    let r = await fetch(`/api/organisations/${organisation.OrganisationId}`, {
      method: 'POST',
      body: JSON.stringify({
        'action': 'updateContact',
        'payload': details
      }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
    } else {
      onEdit()
    }
  }
  
  return (
    <form className='flex flex-col'>
      <h2 className="text-center text-lg underline mb-1">Edit Contact Details</h2>
      <label className='underline my-1'>Email:</label>
      <input className="p-1 border rounded w-full" name='email' value={details.email} onChange={handleChange} />
      <label className='underline my-1'>Phone:</label>
      <input className="p-1 border rounded w-full" name='phone' value={details.phone} onChange={handleChange} />
      <label className='underline my-1'>Description:</label>
      <textarea className='border rounded-xl p-3' name='description' rows={10} cols={50} value={details.description} onChange={handleChange} />
      <p className="text-danger text-sm text-center my-1">{ error }</p>
      <button className='p-2 mt-1 rounded bg-secondary' onClick={handleSubmit}>Save</button>
    </form>
  )
}
