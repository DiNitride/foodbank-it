import { useState } from "react";
import ErrorLine from "../../components/ErrorLine";
import Layout from "../../components/Layout";
import { useToggle } from "../../hooks/useToggle";

export default function DonateStock({}) {
  let validator = RegExp('.*[a-zA-Z]+.*', 'gm')
  let [text, setText] = useState('')
  let [success, toggleSuccess] = useToggle(false)
  let [error, setError] = useState('')

  let handleSubmit = async (e) => {
    e.preventDefault()
    if (!validator.test(text)) {
      setError('Donation text cannot be blank')
      return
    }
    let r = await fetch('/api/donations/stock', {
      method: 'POST',
      body: JSON.stringify({ text: text }),
      headers: {'Content-Type': 'application/json'}
    })
    if (r.ok) {
      toggleSuccess()
    } else {
      setError('There was an error submitting your donation')
    }
  }

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className="w-full md:w-[600px] mt-2">
          { !success ?
          <>
            <h1 className='text-center underline text-xl'>Donate Stock</h1>
            <form className='flex flex-col'>
              <textarea className='rounded-xl border my-2' rows={12} value={text} onChange={(e) => setText(e.target.value)}></textarea>
              <ErrorLine error={error} />
              <button className='border rounded mt-2 p-1 bg-secondary' onClick={handleSubmit}>Submit</button>
            </form>
          </> :
          <h1 className='mt-2 text-center text-xl'>Donation Recieved, Thank You!</h1>
          }
        </div>
      </div>
    </Layout>
  )
}