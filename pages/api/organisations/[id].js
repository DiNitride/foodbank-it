import { getUser } from "../../../lib/users"
import { getSession } from "next-auth/react"
import { deleteOrganisation, getOneOrganisationById, updateOrgContact, updateOrgManager } from "../../../lib/organisations"
import api from "../../../lib/api"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff', 'partner'],
    handler: get
  },
  'POST': {
    authenticated: true,
    roles: ['admin', 'partner'],
    handler: post
  },
  'DELETE': {
    authenticated: true,
    roles: ['admin'],
    handler: handler_delete
  }
})

async function get(req, res, session) {
  let { id } = req.query
  if (session.user.type === 'staff' || session.user.org === Number.parseInt(id)) {
    let org = await getOneOrganisationById(id)
    if (org) {
      res.json(org)
    } else {
      res.status(404).json({ error: `No organisation found with ${id}`})
    }
  }
}

async function post(req, res, session) {
  let { id } = req.query
  let organisation = await getOneOrganisationById(id)
  if (!organisation) {
    res.status(404).json({ error: `No organisation found with ${id}`})
  }
  if (session.user.type === 'staff' || session.user.org === Number.parseInt(id)) {
    let { action, payload } = req.body
    if (action === 'updateContact') {
      await updateOrgContact(id, payload.description, payload.email, payload.phone)
      res.json({ success: true })
    } else if (action === 'transferOwnership') {
      if (session.user.type === 'admin' || organisation.OrganisationManagerId === session.user.UserId) {
        await updateOrgManager(organisation.OrganisationId, payload.newManagerId)
        res.json({ success: true })
      } else {
        res.status(403).json({ error: 'You do not have permission to modify this organisation'})
      }
    } else {
      res.status(400).json({ error: 'Invalid post action' })
    }
  }
}

async function handler_delete(req, res, session) {
  await deleteOrganisation(id)
  res.json({ success: true })
}
