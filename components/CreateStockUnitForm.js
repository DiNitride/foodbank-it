import { useState } from "react"
import useSWR from "swr"
import DatePicker from 'react-datepicker'

export default function CreateStockUnitForm({ onCreate }) {
  let { data: units, error: unitsError, mutate } = useSWR('/api/stock/units')
  let [details, setDetails] = useState({
    unitName: '',
    unitSize: ''
  })
  let [error, setError] = useState('')

  let handleChange = async (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }
  
let handleSubmit = async (e) => {
  setError('')
  if (details.unitName === '') {
    setError('You must enter a name')
    return
  }
  if (details.unitSize === '') {
    setError('You must enter a size description')
    return
  }
  let r = await fetch(`/api/stock/units`, {
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
      <h2 className="text-center text-lg underline mb-2">Add Stock Type</h2>
      <label className="my-1 block">Unit Name</label>
      <input className="block w-full border rounded p-1" name='unitName' value={details.unitName} onChange={handleChange}></input>
      <label className="my-1 block">Unit Size</label>
      <input className="block w-full border rounded p-1" name='unitSize' value={details.unitSize} onChange={handleChange}></input>
      <p className="text-center text-danger text-sm my-1">{ error }</p>
      <button className="text-center p-2 rounded bg-secondary w-full mt-1" onClick={handleSubmit}>Add</button>
    </form>
  )
}
