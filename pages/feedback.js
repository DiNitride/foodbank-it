import { useState } from "react"
import Layout from '../components/Layout'

export default function Feedback({}) {
  let [feedback, setFeedback] = useState('')
  let [error, setError] = useState('')
  let [submitted, setSubmitted] = useState(false)

  let handleChange = (e) => {
    setFeedback(e.target.value)
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    if (feedback === '') {
      setError('Please enter your feedback')
      return
    }
    let r = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ feedback: feedback }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!r.ok) {
      let { error } = await r.json()
      setError(error)
    } else {
      setSubmitted(true)
    }
  }

  return (
    <Layout>
      <div className="m-2 w-full sm:w-[600px] text-center">
        { submitted ? <>
          <h1 className='m-5 text-xl underline'>Thanks for your feedback!</h1>
        </> : <>
          <h1 className="text-xl underline">Submit Feedback</h1>
          <p>We'd love to hear your feedback on how we can improve our service</p>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <textarea
              className="rounded-xl p-3 m-2 border"
              cols={40}
              rows={10}
              value={feedback}
              onChange={handleChange}
            />
            <p className="text-red-500 text-sm">{ error }</p>
            <button type="submit" className="m-2 p-2 bg-secondary rounded">Submit</button>
          </form>
        </>}
      </div>
    </Layout>
  )
}