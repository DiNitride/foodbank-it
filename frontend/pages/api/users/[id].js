import { getUser } from "../../../lib/users"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  // let session = await getSession({ req })
  // if (!session) {
  //   res.status(401).json({error: 'You are not authorised to access this resource'})
  // }
  let { id } = req.query
  let user = await getUser(id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: `User ${id} not found`})
  }
}