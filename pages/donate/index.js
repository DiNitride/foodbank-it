import Layout from '../../components/Layout'
import Head from 'next/head'
import { useState } from 'react'

export default function Donate() {
  let [value, setValue] = useState('15.00')
  let validator = RegExp('^[0-9]*\\.?[0-9]{0,2}$')

  let onChange = (e) => {
    if (validator.test(e.target.value)) {
      setValue(e.target.value)
    }
  }

  let onFocusRemove = (e) => {
    if (value == '') {
      setValue('15.00')
      return
    }
    if (RegExp('^[0-9]+$').test(value)) {
      setValue(`${value}.00`)
      return
    }
    if (RegExp('^[0-9]+\\.$').test(value)) {
      setValue(`${value}00`)
      return
    }
    if (RegExp('^[0-9]+\\.[0-9]$').test(value)) {
      setValue(`${value}0`)
      return
    }
    if (RegExp('^[0-9]+\\.[0-9]{2}$').test(value)) {
      return
    }
  }
  
  return (
    <Layout>
      <Head>
        <title>Donate</title>
      </Head>
      <div className='m-2 flex justify-center'>
        <div className='w-full md:w-[600px]'>
          <h1 className='underline text-xl text-center mb-2'>Financial Donations</h1>
          <p>As a charity organisation, we rely on donations to stay afloat. Cash donations are the most effective way to support us directly, as they money can be spent where it is needed most. Donations can be made online via the form below.</p>
          <p className='pt-2'>If you wish to donate physical items, please bring them to the address listed on the homepage, or leave at a local collection point with one of our partner organisations.</p>
          <form className='mt-2 p-2 rounded flex flex-col' action='/api/donations/create-payment-session'>
            <h2 className='text-center underline mb-1'>Make Donation</h2>
            <input className='p-3 border rounded' id='value' name='value' placeholder='20.00' value={value} onChange={onChange} onBlur={onFocusRemove}></input>
            <button className='bg-secondary rounded p-1 m-2 hover:shadow' type='submit'>Donate</button>
          </form>
        </div>
      </div>
    </Layout>
  )
} 
