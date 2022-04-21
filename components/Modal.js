import { useRef } from "react"

export default function Modal({ closeModal, children }) {
  let modalRef = useRef(null)

  let handleClick = (e) => {
    e.preventDefault()
    if (!modalRef.current.contains(e.target)) {
      closeModal()
    }
  }

  return (
    <div className='fixed w-screen h-screen flex justify-center items-center bg-opacity-50 bg-black top-0 left-0 z-50' onClick={handleClick}>
      <div ref={modalRef} className='rounded bg-primary p-5 flex flex-col relative min-w-[300px]'>
        { children }
      </div>
    </div>
  )
}
