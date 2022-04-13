import { generateCode, getCode, insertCode } from "../../../lib/codes"
import { getSession } from 'next-auth/react'
import api from '../../../lib/api'

export default api({
  'POST': {
    authenticated: true,
    roles: ['admin', 'support'],
    handler: post
  }
})

async function post(req, res, session) {
  let counter = 0
  let code = ''
  do {
    if (counter > 250) {
      // Crash
      res.status(500).json({ error: 'An error occured while generating the referral code'})
      return
    }
    code = generateCode()
    let exists = await getCode(code)
    if (!exists) {
      break
    }
    counter++
  } while (true)
  let { surname } = req.body
  let referral = await insertCode(code, surname, session.user.UserId)
  res.json(referral)
}
