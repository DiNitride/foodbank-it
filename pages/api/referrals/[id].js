import api from "../../../lib/api"
import { deleteCode, getCode, getCodeById } from "../../../lib/codes"

export default api({
  'GET': {
    handler: get,
    authentication: true,
    roles: ['staff', 'support']
  },
  'DELETE': {
    authentication: true,
    roles: ['staff', 'support'],
    handler: deleteHandler
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let code = await getCodeById(id)
  if (!code) {
    res.status(404).json({ error: `No code with ${id} found`})
    return
  }
  res.json({ code: code })
} 

async function deleteHandler(req, res, session) {
  let { id } = req.query
  let code = await getCodeById(id)
  if (session.user.admin || code.CreatedBy === session.user.UserId) {
    await deleteCode(id)
    res.json({ success: true })
  } else {
    res.status(403).json({ error: 'You cannot delete a referral code you didn\'t create' })
  }
}
