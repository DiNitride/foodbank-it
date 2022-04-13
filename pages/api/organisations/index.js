import { getUsers } from "../../../lib/users";
import { getSession } from "next-auth/react";
import { getOrganisations } from "../../../lib/organisations";
import api from '../../../lib/api'

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  }
})

async function get(req, res) {
  let orgs = await getOrganisations()
  res.json(orgs)
}