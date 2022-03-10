import Link from 'next/link'
import { useToggle } from '../hooks/useToggle'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({ children }) {
  let [menuOpen, toggleMenu] = useToggle()
  let { data: session, status } = useSession()

  let handleAuth = (e) => {
    e.preventDefault()
    if (status !== 'authenticated') {
      signIn()
    } else {
      signOut()
    }
  }

  return (
    <div className="h-screen w-screen bg-white">
      <nav className='w-full flex flex-col md:flex-row p-2 md:justify-between bg-gray-300'>
        <div className='flex justify-between'>
          <div>
            <h1 className="text-xl"><Link href='/'>Foodbank Name</Link></h1>
          </div>
          <button onClick={toggleMenu} className='md:hidden'>Menu</button>
        </div>
        
        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row`}>
          { status === 'authenticated' ? <p className='px-2'>Welcome, {session.user.forename}</p> : "" }
          <a className="border rounded" onClick={handleAuth}>{ status !== 'authenticated' ? 'Sign In' : 'Sign Out'}</a>
        </div>
      </nav>
      { children }
    </div>
  )
}