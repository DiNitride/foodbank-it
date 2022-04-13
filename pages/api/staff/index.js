import api from "../../../lib/api";
import { getStaff, insertStaff } from "../../../lib/staff";

export default api({
  'GET': {
    authentication: true,
    roles: ['admin'],
    handler: get
  },
  'POST': {
    authentication: true,
    roles: ['admin'],
    handler: post
  }
})

async function get(req, res, session) {
  let staff = await getStaff()
  res.json(staff)
}

async function post(req, res, session) {
  let { user: userDetails } = req.body
  let user = await insertStaff(userDetails)
  res.json(user)
}
