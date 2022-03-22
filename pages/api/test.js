import { generateNewUser } from "../../lib/users"

export default async function handler(req, res) {
  let { forename , surname, password } = req.body
  let user = await generateNewUser(forename, surname, password)
  res.json(user)
}