import { useState } from "react"
import useSWR from "swr"
import DatePicker from 'react-datepicker'

export default function CreateStockForm({ onCreate }) {
  let { data: units, error: unitsError, mutate } = useSWR('/api/stock/units')
  let [details, setDetails] = useState({
    unit: '',
    useBy: new Date(),
    quantity: 1
  })
  let [error, setError] = useState('')
  let now = new Date()

  let handleChange = async (e) => {
    if (e.target.name === 'quantity') {
      if (!RegExp('^[0-9]*$').test(e.target.value)) {
        return
      }
    }
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }
  
let handleSubmit = async (e) => {
  setError('')
  if (details.unit === '') {
    setError('You must select a unit type')
    return
  }
  if (details.quantity === '' || details.quantity === 0) {
    setError('Quantity cannot be 0')
    return
  }
  if (details.useBy < now) {
    setError('Use By date cannot be in the past!')
    return
  }
  let r = await fetch(`/api/stock`, {
    method: 'POST',
    body: JSON.stringify(details),
    headers: {'Content-Type': 'application/json'}
  })
  if (!r.ok) {
    let { error } = await r.json()
    setError(error)
  } else {
    onCreate()
  }

}

  return (
    <form>
      <h2 className="text-center text-lg underline mb-2">Add Stock</h2>
      <label className="my-1 block">Stock Type</label>
      <select className="p-1 rounded w-full bg-secondary" name='unit' value={details.unit} onChange={handleChange}>
        { !units ? <option disabled>Loading</option> : <>
          <option value='' disabled>Select Unit Type</option>
          { units && units.map((unit) => <option value={unit.UnitId}>{ unit.UnitName } ({ unit.UnitSize })</option>)}
        </> }
      </select>
      <label className="my-1 block">Use By</label>
      <DatePicker className="p-1 w-full rounded border" selected={details.useBy} onChange={(date) => setDetails({ ...details, useBy: date })} />
      <label className="my-1 block">Quantity</label>
      <input className="block w-full border rounded p-1" name='quantity' value={details.quantity} onChange={handleChange}></input>
      <p className="text-center text-danger text-sm my-1">{ error }</p>
      <button className="text-center p-2 rounded bg-secondary w-full mt-1" onClick={handleSubmit}>Add</button>
    </form>
  )
}
