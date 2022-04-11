import { getSession } from "next-auth/react"
import { getStockDonations, insertStockDonation } from "../../../lib/donations"

export default async function handler(req, res) {
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({ error: 'You are not authorised to access this resource' })
  }

  if (req.method === 'GET') {
    let donations = await getStockDonations()
    res.json(donations)
  } else if (req.method === 'POST') {
    if (session.user.type !== 'partner' || session.user.orgType !== 'supplier') {
      res.status(403).json({ error: 'You must be a member of a supplier organisation to access this submit stock donations' })
    }
    let { text } = req.body
    console.log(text)
    console.log(session.user.UserId)
    console.log(session.user.org)
    let donation = await insertStockDonation(text, session.user.UserId, session.user.org)
    console.log(donation)
    res.json(donation)
  }

}