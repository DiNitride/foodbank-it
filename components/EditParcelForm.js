import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect, useRef } from "react"

export default function EditParcelForm({ parcel, onDelete, onSave }) {
  let [error, setError] = useState('')
  let [editMode, setEditMode] = useState(false)
  let [parcelDetails, setParcelDetails] = useState({
    complete: parcel.ParcelComplete,
    details: parcel.ParcelDetails
  })

  let handleChange = (e) => {
    setParcelDetails({
      ...parcelDetails,
      [e.target.name]: e.target.value
    })
  }

  let handleSave = async (e) => {
    let r = await fetch(`/api/parcels/${parcel.ParcelId}`, {
      method: 'PATCH',
      body: JSON.stringify(parcelDetails),
      headers: {'Content-Type': 'application/json'}
    })
    let data = await r.json()
    if (!r.ok) {
      let { error } = data
      setError(error)
    } else {
      onSave()
    }
  }


  let handleDelete = async (e) => {
    let r = await fetch(`/api/parcels/${parcel.ParcelId}`, {
      method: 'DELETE'
    })
    let data = await r.json()
    if (!r.ok) {
      let { error } = data
      setError(error)
    } else {
      onDelete()
    }
  }

  return (
    <div className='flex flex-col'>
      <h2 className='text-center underline text-lg'>Parcel #{parcel.ParcelId}</h2>
      <label>Parcel Details:</label>
      <textarea value={parcelDetails.details} className='rounded-xl border p-2' placeholder='Content' onChange={handleChange} name='details' />
      <label>Parcel Complete?</label>
      <select value={parcelDetails.complete} className='p-2 rounded-xl' onChange={handleChange} name='complete'>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>
      <div className='flex justify-center p-2 mt-2'>
        <span className='mx-2 cursor-pointer' onClick={() => handleSave()}><FontAwesomeIcon size='lg' icon='floppy-disk' width={32} className='mx-1' />Save Changes</span>
        <span className='mx-2 cursor-pointer' onClick={() => handleDelete()}><FontAwesomeIcon size='lg' icon='trash' width={32} className='mx-1' />Delete Parcel</span>
      </div>
      <p className='text-red-600 text-center'>{ error }</p>
    </div>
  )
}
