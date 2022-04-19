import { getSession } from "next-auth/react"
import api from "../../../../lib/api"
import { getStaffForOrg } from "../../../../lib/organisations"

export default api({
  'GET': {
    authenticated: true,
    roles: ['admin', 'partner'],
    handler: get
  }
})

async function get(req, res, session) {
  let { id } = req.query
  if (session.user.admin || (session.user.org === Number.parseInt(id) && session.user.manager)) {
    let staff = await getStaffForOrg(id)
    res.json(staff)
  } else {
    res.status(403).json({ error: 'You do not have permission to access this resource'})
  }
}
