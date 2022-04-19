import api from "../../../lib/api";
import { getOneStaffById, getStaff, insertStaff } from "../../../lib/staff";
import { deleteUser } from "../../../lib/users";

export default api({
  'GET': {
    authentication: true,
    roles: ['admin'],
    handler: get
  },
  'DELETE': {
    authentication: true,
    roles: ['admin'],
    handler: deleteHandler
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let staff = await getOneStaffById(id)
  res.json(staff)
}

async function deleteHandler(req, res, session) {
  let { id } = req.query
  let user = await deleteUser(id)
  res.json({ success: true })
}
