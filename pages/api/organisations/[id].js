import { getUser } from "../../../lib/users"
import { getSession } from "next-auth/react"
import { deleteOrganisation, getOneOrganisationById } from "../../../lib/organisations"
import api from "../../../lib/api"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  },
  'DELETE': {
    authenticated: true,
    roles: ['admin'],
    handler: handler_delete
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let org = await getOneOrganisationById(id)
  if (org) {
    res.json(org)
  } else {
    res.status(404).json({ message: `Organisation ${id} not found`})
  }
}

async function handler_delete(req, res, session) {
  await deleteOrganisation(id)
  res.json({ success: true })
}