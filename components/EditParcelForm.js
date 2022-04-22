import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect, useRef } from "react"
import useSWR from "swr"

export default function EditParcelForm({ parcel, onDelete, onSave }) {
  let { data: parcelItems, error: errorParcelItems, mutate: mutateParcelItems } = useSWR(`/api/parcels/${parcel.ParcelId}/stock`)
  let { data: availableItems, error: errorAvailableItems, mutate: mutateAvailableItems } = useSWR(`/api/stock?filter=unassigned`)
  let [error, setError] = useState('')
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

  let mutateAll = () => {
    mutateAvailableItems()
    mutateParcelItems()
  }

  let handleAdd = async (stockId) => {
    let r = await fetch(`/api/parcels/${parcel.ParcelId}/stock`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'add',
        payload: {
          stockId: stockId
        }
      }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
    } else {
      mutateAll()
    }
  }

  let handleRemove = async (stockId) => {
    let r = await fetch(`/api/parcels/${parcel.ParcelId}/stock`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'remove',
        payload: {
          stockId: stockId
        }
      }),
      headers: {'Content-Type': 'application/json'}
    })
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
    } else {
      mutateAll()
    }
  }

  return (
    <div className='flex flex-col'>
      <h2 className='text-center underline text-lg'>Parcel #{parcel.ParcelId}</h2>
      { parcel.ParcelUsed ? <p className="text-center">Parcel used in Order #{ parcel.OrderId }</p>: '' }
      <label>Parcel Content:</label>
      { parcel.ParcelUsed && parcelItems ? <>
        <ul className="overflow-y-scroll max-h-[200px] p-2 border rounded-xl">
          { parcelItems.map((item) => <li key={item.StockId} className="before:content-['-'] before:mr-1">{ item.UnitName }</li>) }
        </ul>
      </> : <>
        <p className="text-sm italic mb-1">Parcel content saves automatically</p>
        { parcelItems && availableItems ? <>
          <div className="grid grid-cols-2 grid-rows-[auto_200px] w-[450px] border rounded-xl p-2">
            <div className="col-span-2 flex border-b mb-1">
              <p className="w-1/2 text-center">Available Items</p>
              <p className="w-1/2 text-center">Parcel Content</p>
            </div>
            <div className="overflow-y-scroll">
              { availableItems.map((item) => <div key={item.StockId} className="flex justify-between items-center cursor-pointer px-1 hover:bg-secondary rounded" onClick={() => handleAdd(item.StockId)}>{ item.UnitName } <FontAwesomeIcon icon='square-plus' /></div>) }
            </div>
            <div className="overflow-y-scroll">
              { parcelItems.map((item) => <div key={item.StockId} className="flex justify-between items-center cursor-pointer px-1 hover:bg-secondary rounded" onClick={() => handleRemove(item.StockId)}>{ item.UnitName } <FontAwesomeIcon icon='square-minus' /></div>) }
            </div>
          </div>
        </> : <p>Loading</p>}
        <div className='h-[2px] my-2 bg-gray-200'></div>
      </> }
      <label>Parcel Details:</label>
      <textarea value={parcelDetails.details} className='rounded-xl border p-2' placeholder='Content' onChange={handleChange} name='details' disabled={parcel.ParcelUsed} />
      <label>Parcel Complete?</label>
      <select value={parcelDetails.complete} className='p-2 rounded-xl bg-secondary' onChange={handleChange} name='complete' disabled={parcel.ParcelUsed}>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>
      { parcel.ParcelUsed ? '' : <div className='flex justify-center p-2 mt-2'>
        <span className='mx-2 cursor-pointer' onClick={() => handleSave()}><FontAwesomeIcon size='lg' icon='floppy-disk' width={32} className='mx-1' />Save Changes</span>
        <span className='mx-2 cursor-pointer' onClick={() => handleDelete()}><FontAwesomeIcon size='lg' icon='trash' width={32} className='mx-1' />Delete Parcel</span>
      </div> }
      <p className='text-danger text-center'>{ error }</p>
    </div>
  )
}
