import api from '../../../lib/api'
import { insertFeedback, selectFeedback } from '../../../lib/feedback'

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  },
  'POST': {
    handler: post
  }
})

async function get(req, res, session) {
  let feedback = await selectFeedback()
  res.json(feedback)
}

async function post(req, res, session) {
  let { feedback } = req.body
  if (!feedback || feedback === '') {
    res.status(400).json({ error: 'No feedback body submitted'})
    return
  }
  let id = await insertFeedback(feedback)
  res.json({ success: true, feedbackId: id })
}
