import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import OrderStatusPill from "./OrderStatusPill"

export default function OrderDetails({ order, onDelete, onComplete, onEdit, onError, onClose }) {
  let [error, setError] = useState('')
  let [availableParcels, setAvailableParcels] = useState(null)
  let [selected, setSelected] = useState(null)
  let [editMode, setEditMode] = useState(false)

  let handleComplete = async (e) => {0
    if (!order.OrderParcel) {
      setError('Cannot complete order that has no parcel assigned.')
      return
    }
    let r = await fetch(`/api/orders/${order.OrderId}`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'setPending',
      }),
      headers: {'Content-Type': 'application/json'}
    })
    let data = await r.json()
    if (!r.ok) {
      let { error } = data
      setError(error)
      return
    }
    onComplete()
  }

  let handleEdit = async (e) => {
    setEditMode(true)
    let r = await fetch('/api/parcels?filter=available')
    if (!r.ok) {
      setError('An error occured whilst loading parcels...')
      return
    }
    let parcels = await r.json()
    setAvailableParcels(parcels)
  }

  let handleDelete = async (e) => {
    let r = await fetch(`/api/orders/${order.OrderId}`, {
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
  
  let handleParcelChange = async (e) => {
    setSelected(e.target.value)
  }

  let handleEditSave = async (e) => {
    if (availableParcels === null || selected === null) {
      return
    }
    let r = await fetch(`/api/orders/${order.OrderId}`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'setParcel',
        payload: { parcelId: availableParcels[selected].ParcelId }
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    let data = await r.json()
    if (!r.ok) {
      let { error } = data
      setError(error)
    } else {
      onEdit()
      setEditMode(false)
      setAvailableParcels(null)
      setSelected(null)
    }
  }

  let handleCancelEdit = async (e) => {
    setEditMode(false)
    setAvailableParcels(null)
    setSelected(null)
  }

  let handleClose = async (e) => {
    let r = await fetch(`/api/orders/${order.OrderId}`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'closeOrder'
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    let data = await r.json()
    if (!r.ok) {
      let { error } = data
      setError(error)
    } else {
      onClose()
    }
  }

  return (
    <div className='flex flex-col'>
      <h2 className='text-center underline text-lg'>Order #{order.OrderId}</h2>
      <table>
        <tbody>
          <tr>
            <td className='p-1 font-bold'>Ordered</td>
            <td className='p-1 text-right'>{ order.UserForename } { order.UserSurname }</td>
          </tr>
          <tr>
            <td className='p-1 font-bold'>Order Status</td>
            <td className='text-right'><OrderStatusPill status={order.OrderStatus} /></td>
          </tr>
          <tr>
            <td className='p-1 font-bold'>Order Opened</td>
            <td className='p-1 text-right'>{ order.PrettyOrderOpened }</td>
          </tr>
          <tr>
            <td className='p-1 font-bold'>Order Closed</td>
            <td className='p-1 text-right'>{ order.PrettyOrderClosed ? order.PrettyOrderClosed : '-' }</td>
          </tr>
          <tr>
            <td className='p-1 font-bold'>Assigned Parcel</td>
            { !editMode ? <td className='p-1 text-right'>Parcel #{ order.OrderParcel ? order.OrderParcel : '-' }</td> :
              <td className='text-right'>
                { !availableParcels ? <p>Loading available parcels</p> :
                  <select className='rounded p-1' value={selected} onChange={handleParcelChange}>
                    <option value='' disabled selected>Select Parcel</option>
                    { availableParcels.map((parcel, index) => <option key={parcel.ParcelId} value={index}>Parcel #{parcel.ParcelId}</option>)}
                  </select>
                }
              </td>
            }
          </tr>
        </tbody>
      </table>
      { editMode ? <>
        <div className='flex justify-center p-2'>
          <span className='mx-2 cursor-pointer' onClick={() => handleEditSave()}><FontAwesomeIcon size='lg' icon='check' width={32} className='mx-1' /> Save</span>
          <span className='mx-2 cursor-pointer' onClick={() => handleCancelEdit()}><FontAwesomeIcon size='lg' icon='trash' width={32} className='mx-1' />Discard Changes</span>
        </div>
      </> : order.OrderStatus === 'open' ? <>
        <div className='flex justify-center p-2'>
          <span className='mx-2 cursor-pointer' onClick={() => handleComplete()}><FontAwesomeIcon size='lg' icon='check' width={32} className='mx-1' />Complete Order</span>
          <span className='mx-2 cursor-pointer' onClick={() => handleEdit()}><FontAwesomeIcon size='lg' icon='pen-to-square' width={32} className='mx-1' />Assign Parcel</span>
          <span className='mx-2 cursor-pointer' onClick={() => handleDelete()}><FontAwesomeIcon size='lg' icon='trash' width={32} className='mx-1' />Delete Order</span>
        </div>
      </> : order.OrderStatus === 'ready' ? <>
        <div className='flex justify-center p-2'>
          <span className='cursor-pointer' onClick={() => handleClose()}><FontAwesomeIcon size='lg' icon='check' width={32} className='mx-1' />Close Order</span>
        </div>
      </> : ''}
      
      <p className='text-red-600 text-center'>{ error }</p>
    </div>
  )
}
