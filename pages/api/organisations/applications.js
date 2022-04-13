import { getUsers } from "../../../lib/users";
import { getSession } from "next-auth/react";
import { getOrganisations, getUnapprovedOrganisations } from "../../../lib/organisations";
import api from '../../../lib/api'

export default api({
  'GET': {
    authenticated: true,
    roles: ['admin'],
    handler: get
  }
})

async function get(req, res, session) {
  let orgs = await getUnapprovedOrganisations()
  res.json(orgs)
}