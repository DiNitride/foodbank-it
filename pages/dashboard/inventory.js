import { useEffect, useState } from "react"
import Head from 'next/head'
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "../../components/Modal"
import CreateStockForm from "../../components/CreateStockForm"
import CreateStockUnitForm from "../../components/CreateStockUnitForm"

export default function Inventory({}) {
  let { data: stock, error: stockError, mutate: mutateStock } = useSWR(`/api/stock`)
  let { data: units, error: errorUnits, mutate: mutateUnits } = useSWR('/api/stock/units')
  let [filterUnit, setFilterUnit] = useState('')
  let [addStockModal, setAddStockModal] = useState(false)
  let [addStockUnitModal, setAddStockUnitModal] = useState(false)

  let handleDelete = async (id) => {
    let r = await fetch(`/api/stock/${id}`, {
      method: 'DELETE'
    })
    if (!r.ok) {
      let { error } = await r.json()
      alert(error)
    } else {
      mutateStock()
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Inventory</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold underline text-center mb-2'>Inventory</h1>
        <div className='flex justify-between my-2'>
          <div className="flex">
            <div className="rounded p-1 bg-secondary cursor-pointer" onClick={() => {setAddStockModal(true)}}><FontAwesomeIcon icon='square-plus' size='lg' /> Add Stock</div>
            <div className="rounded p-1 bg-secondary cursor-pointer ml-2" onClick={() => {setAddStockUnitModal(true)}}><FontAwesomeIcon icon='square-plus' size='lg' /> Add Stock Type</div>
          </div>
          <div className="flex">
            { filterUnit !== '' ? <div className="p-1 mx-2 bg-secondary rounded-lg cursor-pointer" onClick={() => setFilterUnit('')}>Clear Filter <FontAwesomeIcon icon='xmark' /></div> : '' }
            <select className="w-[200px] p-1 rounded bg-secondary" value={filterUnit} onChange={(e) => setFilterUnit(e.target.value)}>
              <option value=''>Filter</option>
              { units && units.map((unit) => <option value={unit.UnitId}>{ unit.UnitName }</option>)}
            </select>
          </div>
        </div>
        { !stock ? <p>Loading...</p> : <>
          <table className="border border-collapse text-center w-full">
            <thead>
              <tr>
                <th className="p-1 border">Stock ID</th>
                <th className="p-1 border">Stock Type</th>
                <th className="p-1 border">Use By</th>
                <th className="p-1 border">Parcel</th>
                <th className="p-1 border hidden sm:table-cell">Added On</th>
                <th className="p-1 border hidden sm:table-cell">Added By</th>
                <th className="p-1 border w-auto"></th>
              </tr>
            </thead>
            <tbody>
              { stock.reduce((arr, stock) => {
                console.log(filterUnit)
                console.log(stock.UnitId)
                return filterUnit === '' || stock.UnitId == filterUnit ? [ ...arr, stock ] : arr 
              }, []).map((item) => <tr>
                <td className="p-2 border">{ item.StockId }</td>  
                <td className="p-2 border">{ item.UnitName }</td>  
                <td className="p-2 border">{ item.PrettyUseBy }</td>
                <td className="p-2 border">{ item.ParcelId ? item.ParcelId : '-' }</td>
                <td className="p-2 border hidden sm:table-cell">{ item.PrettyCreatedOn }</td>
                <td className="p-2 border hidden sm:table-cell">{ item.CreatedByForename } { item.CreatedBySurname }</td>
                <td className='p-2 border cursor-pointer' onClick={() => handleDelete(item.StockId)}><FontAwesomeIcon icon='trash' /></td>  
              </tr>)}
            </tbody>
          </table>
          <button className="mt-2" onClick={() => setAddStockModal(true)}><FontAwesomeIcon icon='square-plus' size='xl' /></button>
        </>}
        { addStockModal ? <Modal closeModal={() => setAddStockModal(false)}><CreateStockForm onCreate={() => { setAddStockModal(false); mutateStock() }} /></Modal> : ''}
        { addStockUnitModal ? <Modal closeModal={() => setAddStockUnitModal(false)}><CreateStockUnitForm onCreate={() => { setAddStockUnitModal(false); mutateUnits() }} /></Modal> : ''}
      </div>
    </DashboardLayout>
  )
}
