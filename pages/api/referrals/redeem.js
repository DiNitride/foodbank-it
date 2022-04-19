import { getCode, getCodeByCode, redeemCode } from "../../../lib/codes"
import { getSession } from "next-auth/react"
import { createOrder } from "../../../lib/orders"
import api from "../../../lib/api"

export default api({
  'POST': {
    authentication: true,
    roles: ['client'],
    handler: post
  }
})

async function post(req, res, session) {
  let { code } = req.body
  let exists = await getCodeByCode(code)
  if (!exists) {
    res.status(400).json({ error: 'Could not redeem referral code, it does not exist'})
    return
  }
  if (exists.Redeemed) {
    res.status(400).json({ error: 'Referral code already redeemed'})
    return
  }

  // Code exists!
  // get user who is signed in
  if (exists.AssignedName !== session.user.UserSurname) {
    // Code is not for this user
    res.status(400).json({ error: 'Your name is not assigned to this referral code'})
    return
  }

  let order = await createOrder(session.user.UserId)
  await redeemCode(exists.CodeId, session.user.UserId)
  res.json({ order: order })

}
