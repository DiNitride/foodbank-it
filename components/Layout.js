import Link from 'next/link'
import { useToggle } from '../hooks/useToggle'
import { useSession, signIn, signOut } from "next-auth/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef } from 'react'

export default function Layout({ mainStyling, children }) {
  let [menuOpen, toggleMenu] = useToggle(false)
  let navBarRef = useRef(null)
  let { data: session, status } = useSession()

  let navigationLinks = {
    'Donate': '/donate',
    'Partners': '/partners'
  }

  if (session && session.user.type === 'client') {
    navigationLinks = {
      ...navigationLinks,
      'Orders': '/orders',
      'Parcels': '/parcels'
    }
  }

  if (session && session.user.type === 'staff') {
    navigationLinks = {
      ...navigationLinks,
      'Dashboard': '/dashboard'
    }
  }

  if (session && session.user.type === 'partner' && session.user.orgType === 'support') {
    navigationLinks = {
      ...navigationLinks,
      'Referrals': '/referrals'
    }
  }

  if (session && session.user.type === 'partner' && session.user.orgType === 'supplier') {
    navigationLinks = {
      ...navigationLinks,
      'Submit Inventory': '/donate/stock'
    }
  }

  if (session && session.user.type === 'partner' && session.user.manager) {
    navigationLinks = {
      ...navigationLinks,
      'Organisation Dashboard': '/organisation/dashboard'
    }
  }

  // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  useEffect(() => {
    let handleClick = (e) => {
      if (navBarRef.current && !navBarRef.current.contains(e.target)) {
        if (menuOpen) toggleMenu()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [navBarRef, menuOpen, toggleMenu])

  return (
    <div className="min-h-screen flex flex-col space-between bg-primary">
      <div ref={navBarRef} className='w-full flex flex-col relative bg-primary z-10 top-0 md:flex-row md:justify-between shadow'>
        <div className='flex justify-between border-b md:border-b-0 p-2 items-center '>
          <div>
            <h1 className="text-xl"><Link href='/'>Foodbank Management System</Link></h1>
          </div>
          <button onClick={toggleMenu} className='md:hidden'><FontAwesomeIcon className={`p-2 rounded hover:shadow hover:bg-secondary size='lg'`} icon='bars' /></button>
        </div>
        
        <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute w-full top-full md:static md:w-auto bg-primary font-thin md:flex flex-col md:flex-row p-2 md:items-baseline shadow md:shadow-none`}>
          {
            Object.entries(navigationLinks).map(([label, url]) => (
              <Link key={url} href={url}><a className='p-3 whitespace-nowrap rounded-xl hover:shadow after:block after:absolute after:w-[2px] after:content-[""] after:bg-secondary'>{ label }</a></Link>
            ))
          }
          <div className='flex flex-row justify-evenly w-full mt-2 md:mt-0 ml-0 md:ml-1'>
            { status === 'authenticated' ? <Link href='/me'><a className="cursor-pointer p-3 rounded-xl hover:shadow">Profile</a></Link> : "" }
            { status === 'authenticated' ? <a onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer p-3 rounded-xl hover:shadow">Sign Out</a> : "" }

            { status !== 'authenticated' ? <Link href='/register'><a className="rounded-xl w-full text-center p-3 mr-1 md:mr-0 md:rounded-r-none bg-secondary text-black hover:shadow ">Register</a></Link> : "" }
            { status !== 'authenticated' ? <a onClick={() => signIn()} className="rounded-xl w-full text-center p-3 ml-1 cursor-pointer md:ml-0 md:rounded-l-none bg-secondary text-black hover:shadow">Sign In</a> : "" }
          </div>
        </nav>
      </div>
      <main className={mainStyling ? mainStyling : 'flex justify-center'}>
        { children }
      </main>
    </div>
  )
}
