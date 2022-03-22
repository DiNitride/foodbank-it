import { getSession } from "next-auth/react"
import { approveOrganisation } from "../../../../lib/organisations"

export default async function handler(req, res) {
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({error: 'You are not authorised to access this resource'})
  }
  let { id } = req.query
  let success = await approveOrganisation(id)
  if (success) {
    res.json({ success: success })
  } else {
    res.status(400).json({ message: `Error approving organisation ${id}`})
  }
}