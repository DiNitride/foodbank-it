import api from "../../../lib/api"
import { getStockDonations, insertStockDonation } from "../../../lib/donations"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler: get
  },
  'POST': {
    authenticated: true,
    roles: ['supplier'],
    handler: post
  }
})

async function get(req, res, session) {
  let donations = await getStockDonations()
  res.json(donations)
}

async function post(req, res, session) {
  let { text } = req.body
  let donation = await insertStockDonation(text, session.user.UserId, session.user.org)
  res.json(donation)
}
