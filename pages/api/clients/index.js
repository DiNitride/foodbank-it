import { getSession } from "next-auth/react";
import api from "../../../lib/api";
import { getClients } from "../../../lib/clients";

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  }
})

async function get(req, res, session) {
  let clients = await getClients()
  res.json(clients)
  return
}
