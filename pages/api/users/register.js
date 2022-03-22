import { getOneClientByEmail, insertClient } from "../../../lib/clients"
import { hash } from "../../../lib/passwords"

export default async function register(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({'error': 'You must use POST for this endpoint'})
    return
  }
  let user = JSON.parse(req.body)
  let existingUser = await getOneClientByEmail(user.email)
  if (existingUser) {
    res.status(400).json({ 'error': 'A user with this email already exists' })
    return
  }
  await insertClient(user)
  res.status(201).json({ success: true })
}