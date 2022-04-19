import api from '../../../lib/api'
import { reviewFeedback, selectFeedbackById } from '../../../lib/feedback'

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  },
  'POST': {
    authenticated: true,
    roles: ['staff'],
    handler: post
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let feedback = await selectFeedbackById(id)
  res.json(feedback)
}

async function post(req, res, session) {
  let { id } = req.query
  let { action } = req.body
  if (action === 'review') {
    await reviewFeedback(id, session.user.UserId)
    res.json({ success: true })
  } else {
    res.status(400).json({ error: 'Invalid post action' })
  }
}
