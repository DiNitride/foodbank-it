import api from '../../../lib/api'
import { selectFeedbackById } from '../../../lib/feedback'

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let feedback = await selectFeedbackById(id)
  res.json(feedback)
}
