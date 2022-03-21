import { hash } from "../../../lib/passwords"
import { insertOrganisation } from "../../../lib/organisations"

export default async function register(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({'error': 'You must use POST for this endpoint'})
    return
  }
  let org = JSON.parse(req.body)
  console.log(org)
  await insertOrganisation(org)
  res.status(201).json({ success: true })
}