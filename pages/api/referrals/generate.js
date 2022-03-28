import { generateCode, getCode, insertCode } from "../../../lib/codes"
import { getSession } from 'next-auth/react'

export default async function generate(req, res) {
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({ error: 'You are not authorised to access this resource' })
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' }) 
  }

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