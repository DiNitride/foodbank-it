import { hash } from "../../../lib/passwords"
import { insertOrganisation } from "../../../lib/organisations"
import api from "../../../lib/api"

export default api({
  'POST': {
    handler: post
  }
})

async function post(req, res, session) {
  let org = req.body
  await insertOrganisation(org)
  res.status(201).json({ success: true })
}