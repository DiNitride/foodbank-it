import { getUsers } from "../../../lib/users"
import api from "../../../lib/api"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  }
})

async function get(req, res, session) {
  let users = await getUsers()
  res.json(users)
}
