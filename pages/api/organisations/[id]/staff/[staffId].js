import { getSession } from "next-auth/react"
import api from "../../../../../lib/api"
import { getOneStaffForOrg, deleteOrgStaff } from "../../../../../lib/organisations"
import { hash } from "../../../../../lib/passwords"

export default api({
  'GET': {
    authenticated: true,
    roles: ['admin', 'partner'],
    handler: get
  },
  'DELETE': {
    authenticated: true,
    roles: ['admin', 'partner'],
    handler: deleteHandler
  }
})

async function get(req, res, session) {
  let { id } = req.query
  if (session.user.admin || (session.user.org === Number.parseInt(id) && session.user.manager)) {
    let staff = await getOneStaffForOrg(id)
    res.json(staff)
  } else {
    res.status(403).json({ error: 'You do not have permission to access this resource'})
  }
}

async function deleteHandler(req, res, session) {
  let { id, staffId } = req.query
  if (session.user.admin || (session.user.org === Number.parseInt(id) && session.user.manager)) {
    let staff = await deleteOrgStaff(id, staffId)
    res.json(staff)
  } else {
    res.status(403).json({ error: 'You do not have permission to access this resource'})
  }
}
