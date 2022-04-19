import { getSession } from "next-auth/react"
import api from "../../../../lib/api"
import { approveOrganisation } from "../../../../lib/organisations"

export default api({
  'POST': {
    authenticated: true,
    roles: ['admin'],
    handler: post
  }
})

async function post(req, res, session) {
  try {
    let { id } = req.query
    let success = await approveOrganisation(id)
    res.json({ success: success })
  } catch (e) {
    res.status(400).json({ error: `Error approving organisation ${id}`})
  }
}
