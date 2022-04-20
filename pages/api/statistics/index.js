import api from '../../../lib/api'
import db from '../../../lib/db'

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  }
})

async function get(req, res, session) {
  res.json({
    success: true
  })
}
