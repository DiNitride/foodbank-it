import { deleteUser, getOneUserById, getUser, getUserPassword, updateUserDetails, updateUserPassword } from "../../../lib/users"
import { getSession } from "next-auth/react"
import { hash, verify } from "../../../lib/passwords"
import api from "../../../lib/api"
import { faCropSimple } from "@fortawesome/free-solid-svg-icons"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  },
  'PATCH': {
    authenticated: true,
    handler: patch
  },
  'DELETE': {
    authenticated: true,
    roles: ['admin', 'client'],
    handler: deleteHandler
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let user = await getOneUserById(id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: `User ${id} not found`})
  }
  return
}

async function patch(req, res, session) {0
  let { id } = req.query
  if (session.user.admin || session.user.UserId === Number.parseInt(id)) {
    let { action, payload } = req.body
    if (action === 'updatePassword' || action === 'resetPassword') {
      let { old, new: newPass } = payload
      if (newPass === '') {
        res.status(400).json({ error: 'New password cannot be blank'})
        return
      }

      if (action !== 'resetPassword' && !session.user.admin) {
        let { UserPassword: current } = await getUserPassword(session.user.UserId)
        let passwordCorrect = await verify(current, old)
        if (!passwordCorrect) {
          res.status(400).json({ error: 'Incorrect password entered'})
          return
        }
      }

      let hashed = await hash(newPass)
      await updateUserPassword(id, hashed)
      res.json({ success: true })

    } else if (action === 'updateDetails') {
      let { forename, surname } = payload
      await updateUserDetails(id, forename, surname)
      res.json({ success: true })
      
    } else {
      res.status(400).json({ error: 'Invalid PATCH action' })
    }
  } else {
    res.status(403).json({ error: 'You do not have permission to modify this user'})
  }
}

async function deleteHandler(req, res, session) {
  let { id } = req.query
  if (session.user.admin || session.user.UserId === Number.parseInt(id)) {
    await deleteUser(id)
    res.json({ success: true })
  } else {
    res.status(403).json({ error: 'You do not have permission to delete this user'})
  }
}
