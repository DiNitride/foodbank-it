import { getUser } from "../../../lib/users"
import { getSession } from "next-auth/react"
import { deleteOrganisation, getOneOrganisationById } from "../../../lib/organisations"

export default async function handler(req, res) {
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({error: 'You are not authorised to access this resource'})
  }

  let { id } = req.query
  if (req.method === 'GET') {
    let org = await getOneOrganisationById(id)
    if (org) {
      res.json(org)
    } else {
      res.status(404).json({ message: `Organisation ${id} not found`})
    }
  } else if (req.method === 'POST') {

  } else if (req.method === 'DELETE') {
    await deleteOrganisation(id)
    res.json({ success: true })
  }
  
}