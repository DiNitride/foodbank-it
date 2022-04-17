import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '../../components/Layout'

function FormItem({ onChange, label, type, name, value, placeholder, required }) {
  return <div className='flex flex-col m-2'>
    <label className={`${required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : ''}`}>{ label }</label>
    <input className='border rounded p-2 ' onChange={onChange} type={type} name={name} value={value} placeholder={placeholder} />
  </div>
}

export default function Apply() {
  let { data: session, status } = useSession()
  let [errors, setErrors] = useState([])
  let [applicationComplete, setApplicationComplete] = useState(false)
  let [organisation, setOrganisation] = useState({
    org_name: "",
    org_type: "support",
    org_description: "",
    org_address_line_one: "",
    org_address_line_two: "",
    org_address_town: "",
    org_address_postcode: "",
    applicant_forename: "",
    applicant_surname: "",
    applicant_phone: "",
    applicant_email: "",
  })
  let validators ={
    org_name: RegExp('^[a-zA-Z0-9\\s:!?-_]+$'),
    org_type: RegExp('^.*$'),
    org_description: RegExp('[a-zA-Z\\s:!?-_]+'),
    org_address_line_one: RegExp('^[a-zA-Z0-9\\s,]+$'),
    org_address_line_two: RegExp('^[a-zA-Z0-9\\s,]*$'),
    org_address_town: RegExp('^[a-zA-Z]+$'),
    org_address_postcode: RegExp('^[a-zA-Z]{2}[0-9]{1,2}\\s?[0-9]{1}[a-zA-Z]{2}$'),
    applicant_forename: RegExp('^[a-zA-Z]+$'),
    applicant_surname: RegExp('^[a-zA-Z-]+$'),
    applicant_email: RegExp('^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-_.]+\\.[a-zA-Z]+$'),
    applicant_phone: RegExp('^[0-9]{10,11}$')
  }
  let validatorsErrors ={
    applicant_forename: 'Invalid Forename',
    applicant_surname: 'Invalid Surname',
    applicant_phone: 'Invalid Phone',
    applicant_email: 'Invalid Email Address',
    org_name: 'Invalid Organisation Name',
    org_type: 'Invalid Organisation Type',
    org_description: 'Invalid Description',
    org_address_line_one: 'Invalid Address Line One',
    org_address_line_two: 'Invalid Address Line Two',
    org_address_town: 'Invalid Address Town',
    org_address_postcode: 'Invalid Postcode',
  }

  let handleChange = (e) => {
    setOrganisation({
      ...organisation,
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    let errors = []
    for (let [key, value] of Object.entries(organisation)) {
      if (!validators[key].test(value)) {
        errors.push(validatorsErrors[key])
      }
    }

    if (errors.length !== 0) {
      setErrors(errors)
      return
    }

    
    let r = await fetch('/api/organisations/apply', {
      method: 'POST',
      body: JSON.stringify(organisation),
      headers: {'Content-Type': 'application/json'}
    })
    let { success, error } = await r.json()
    if (!r.ok && !error) {
      setErrors(['Something went wrong... Please refresh and try again'])
    }
    if (success) setApplicationComplete(true)
    if (error) setErrors([ error ])
  }

  return (
    <Layout>
      <Head>
        <title>Partner Application</title>
      </Head>
      <div className='m-2 flex justify-center'>
        { !applicationComplete ?
        <form onSubmit={handleSubmit} className='border rounded p-2 w-full md:w-[600px] flex flex-col align-middle justify-center'>
          <p className='text-center mt-2'>Agency Information</p>
          <FormItem onChange={handleChange} type='text' label='Name' name='org_name' value={organisation.org_name} placeholder='' required />
          <div className='flex flex-col m-2'>
            <label className={'after:content-[\'*\'] after:ml-0.5 after:text-red-500'}>Agency Type</label>
            <div>
              <label className='mr-2'>Supplier Business</label>
              <input type='radio' id='supplier' name='org_type' value='supplier' checked={organisation.org_type === 'supplier'} onChange={handleChange} />
              <br />
              <label className='mr-2'>Supporting Agency</label>
              <input type='radio' id='support' name='org_type' value='support' checked={organisation.org_type === 'support'} onChange={handleChange} />
            </div>
          </div>
          <div className='flex flex-col m-2'>
            <label className={'after:content-[\'*\'] after:ml-0.5 after:text-red-500'}>Description</label>
            <textarea className='border rounded p-2 h-[200px]' onChange={handleChange} type='text' name='org_description' value={organisation.org_description} placeholder='' />
          </div>
          <FormItem onChange={handleChange} type='text' label='Address Line One' name='org_address_line_one' value={organisation.org_address_line_one} placeholder='' required />
          <FormItem onChange={handleChange} type='text' label='Address Line Two' name='org_address_line_two' value={organisation.org_address_line_two} placeholder='' />
          <FormItem onChange={handleChange} type='text' label='Town' name='org_address_town' value={organisation.org_address_town} placeholder='' required />
          <FormItem onChange={handleChange} type='text' label='Postcode' name='org_address_postcode' value={organisation.org_address_postcode} placeholder='' required />
          <p className='text-center mt-2'>Representative Details</p>
          <FormItem onChange={handleChange} type='text' label='Forename' name='applicant_forename' value={organisation.applicant_forename} placeholder='Joe' required/>
          <FormItem onChange={handleChange} type='text' label='Surname' name='applicant_surname' value={organisation.applicant_surname} placeholder='Bloggs' required />
          <FormItem onChange={handleChange} type='text' label='Email' name='applicant_email' value={organisation.applicant_email} placeholder='joe.blogs@example.com' required />
          <FormItem onChange={handleChange} type='text' label='Phone' name='applicant_phone' value={organisation.applicant_phone} placeholder='' required />
          { errors !== [] ? errors.map((error, i) => (
            <p key={i} className='text text-red-500 text-center p-2'>{ error }</p>
          )) : ""}
          <button className='m-2 p-3 border rounded-xl bg-emerald-400' type='submit'>Apply</button>
        </form>
        :
        <div className='border p-5 rounded-xl text-center'>
          <h1 className='text-xl font-semibold'>Application Recieved</h1>
          <p className='m-2 text-lg'>We will contact you once the application has been reviewed</p>
        </div>}
      </div>
    </Layout>
  )
}
