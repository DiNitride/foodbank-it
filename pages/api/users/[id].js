import { getOneUserById, getUser, getUserPassword, updateUserPassword } from "../../../lib/users"
import { getSession } from "next-auth/react"
import { hash } from "../../../lib/passwords"
import api from "../../../lib/api"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  },
  'PATCH': {
    authenticated: true,
    roles: ['admin'],
    handler: patch
  }
})

async function get(req, res) {
  let { id } = req.query
  let user = await getOneUserById(id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: `User ${id} not found`})
  }
  return
}

async function patch(req, res) {
  let { action, payload } = req.body
  if (action === 'updatePassword') {
    console.log('Updating password')
    let { old, new: newPass } = payload
    let confirmOld = getUserPassword(session.user.UserId)
    if (old !== confirmOld) {
      console.log('Incorrect old password')
      res.status(400).json({ error: 'Old password entered was incorrect'})
    }
    let hashed = await hash(newPass)
    await updateUserPassword(hashed)
    console.log('Updated password')
    res.json({ success: true })
  } else {
    res.status(400).json({ error: 'Invalid PATCH action' })
  }
  return
}
