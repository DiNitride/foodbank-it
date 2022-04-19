import api from "../../../../../lib/api"
import { getStaffForOrg, insertOrgStaff } from '../../../../../lib/organisations'
import { hash } from '../../../../../lib/passwords'

export default api({
  'GET': {
    authenticated: true,
    roles: ['admin', 'partner'],
    handler: get
  },
  'POST': {
    authenticated: true,
    roles: ['admin', 'partner'],
    handler: post
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

async function post(req, res, session) {
  let { id } = req.query
  if (session.user.admin || (session.user.org === Number.parseInt(id) && session.user.manager)) {
    let { user: details } = req.body
    let password = await hash('password')
    let staff = await insertOrgStaff(id, details.forename, details.surname, details.password)
    res.json(staff)
  } else {
    res.status(403).json({ error: 'You do not have permission to access this resource'})
  }
}
