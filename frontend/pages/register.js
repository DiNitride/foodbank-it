import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '../components/Layout'

function FormItem({ onChange, label, type, name, value, placeholder, required }) {
  return <div className='flex flex-col m-2'>
    <label className={`${required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : ''}`}>{ label }</label>
    <input className='border rounded p-2 ' onChange={onChange} type={type} name={name} value={value} placeholder={placeholder} />
  </div>
}

export default function Register() {
  let { data: session, status } = useSession()
  let [errors, setErrors] = useState([])
  let [user, setUser] = useState({
    forename: "",
    surname: "",
    email: "",
    password: "",
    address_line_one: "",
    address_line_two: "",
    address_town: "",
    address_postcode: "",
    phone: "",
  })
  let validators = {
    forename: RegExp('^[a-zA-Z]+$'),
    surname: RegExp('^[a-zA-Z-]+$'),
    email: RegExp('^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-_.]+\\.[a-zA-Z]+$'),
    phone: RegExp('^[0-9]{10,11}$'),
    password: RegExp('^.*$'),
    address_line_one: RegExp('^[a-zA-Z0-9,\\s]+$'),
    address_line_two: RegExp('^[a-zA-Z0-9,\\s]?$'),
    address_town: RegExp('^[a-zA-Z]+$'),
    address_postcode: RegExp('^[a-zA-Z]{2}[0-9]{1,2}\\s?[0-9]{1}[a-zA-Z]{2}$'),
  }
  let validatorErrors = {
    forename: "Invalid Forename",
    surname: "Invalid Surname",
    email: "Invalid Email",
    password: "Invalid Password",
    address_line_one: "Invalid Address Line One",
    address_line_two: "Invalid Address Line Two",
    address_town: "Invalid Address Town",
    address_postcode: "Invalid Postcode",
    phone: "Invalid phone number",
  }
  let [registered, setRegistered] = useState(false)

  let handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    let errors = []
    for (let [key, value] of Object.entries(user)) {
      if (!validators[key].test(value)) {
        errors.push(validatorErrors[key])
      }
    }

    if (errors.length !== 0) {
      setErrors(errors)
      return
    }

    let r = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    let { success, error } = await r.json()
    if (!r.ok && !error) {
      setErrors('Something went wrong... Please refresh and try again')
    }
    if (success) setRegistered(true)
    if (error) setErrors([ error ])
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <div className='m-2 flex justify-center'>
        { !registered ?
        <form onSubmit={handleSubmit} className='border rounded p-2 w-full md:w-1/3 flex flex-col align-middle justify-center'>
          <FormItem onChange={handleChange} type='text' label='Forename' name='forename' value={user.forename} placeholder='Joe' required/>
          <FormItem onChange={handleChange} type='text' label='Surname' name='surname' value={user.surname} placeholder='Bloggs' required />
          <FormItem onChange={handleChange} type='text' label='Email' name='email' value={user.email} placeholder='joe.blogs@example.com' required />
          <FormItem onChange={handleChange} type='password' label='Password' name='password' value={user.password} password='' placeholder='********' required />
          <FormItem onChange={handleChange} type='text' label='Address Line One' name='address_line_one' value={user.address_line_one} placeholder='' required />
          <FormItem onChange={handleChange} type='text' label='Address Line Two' name='address_line_two' value={user.address_line_two} placeholder='' />
          <FormItem onChange={handleChange} type='text' label='Town' name='address_town' value={user.address_town} placeholder='' required />
          <FormItem onChange={handleChange} type='text' label='Postcode' name='address_postcode' value={user.address_postcode} placeholder='' required />
          <FormItem onChange={handleChange} type='text' label='Phone' name='phone' value={user.phone} placeholder='' required />
          { errors.map((error) => (<p className='text text-red-500 text-center p-2'>{ error }</p>)) }
          <button className='m-2 p-3 border rounded-xl bg-emerald-400' type='submit'>Register Account</button>
        </form>
        :
        <div className='border p-5 rounded-xl text-center'>
          <h1 className='text-xl font-semibold'>Account Registered</h1>
          <p className='m-2 text-lg'>Please click <span onClick={() => signIn()} className='cursor-pointer underline'>here</span> to sign in</p>
        </div>}
      </div>
    </Layout>
  )
}
