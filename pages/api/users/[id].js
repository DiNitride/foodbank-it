import { getOneUserById, getUser } from "../../../lib/users"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  let session = await getSession({ req })
  let { id } = req.query
  if (!session) {
    res.status(401).json({error: 'You must be authenticated to access this resource'})
    return
  }

  if (session.user.type === 'staff' || session.user.UserId === id) {
    // GET: Get a User
    if (req.method === 'GET') {
      let user = await getOneUserById(id)
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ message: `User ${id} not found`})
      }
      return
    }
    // PATCH: Update content of User
    if (req.method === 'UPDATE') {
      let user = await getOneUserById(id)
      if (!user) {
        res.status(404).json({ message: `User ${id} not found`})
        return
      }
      
      return
    }
  }
  res.status(403).json({error: 'You are not authorised to access this resource'})
}