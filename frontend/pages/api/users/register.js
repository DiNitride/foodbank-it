import { hash } from "../../../lib/passwords"
import { getOneUserByUsernameOrEmail, insertClient } from "../../../lib/users"

export default async function register(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({'error': 'You must use POST for this endpoint'})
    return
  }
  let user = JSON.parse(req.body)
  let existingUser = await getOneUserByUsernameOrEmail(user.email)
  if (existingUser) {
    res.status(400).json({ 'error': 'A user with this email already exists' })
    return
  }
  let hashedPassword = await hash(user.password)
  user = { ...user, password: hashedPassword }
  await insertClient(user)
  res.status(201).json({ success: true })
}