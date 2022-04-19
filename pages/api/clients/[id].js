import { getSession } from "next-auth/react";
import api from "../../../lib/api";
import { getClients, getOneClientById } from "../../../lib/clients";

export default api({
  'GET': {
    authenticated: true,
    roles: ['admin', 'client'],
    handler: get
  }
})

async function get(req, res, session) {
  let { id } = req.query
  if (session.user.type === 'staff' || session.user.UserId === id) {
    let client = await getOneClientById(id)
    res.json(client)
  } else {
    res.status(403).json({ error: 'You do not have permission to access this resource'})
  }
}
