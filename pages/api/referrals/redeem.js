import { getCode, redeemCode } from "../../../lib/codes"
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
  console.log('Redeeming referral code!')
  let { code } = req.body
  console.log(`Looking for ${code}`)
  let exists = await getCode(code)
  if (!exists) {
    res.status(400).json({ error: 'Could not redeem referral code, it does not exist'})
    return
  }
  if (exists.Redeemed) {
    res.status(400).json({ error: 'Referral code already redeemed'})
    return
  }

  // Code exists!
  console.log(`Code is assigned to: ${exists.AssignedName}`)
  // get user who is signed in
  console.log(`Authenticated user: ${session.user.UserSurname}`)
  console.log(exists.AssignedName === session.user.UserSurname)
  if (exists.AssignedName !== session.user.UserSurname) {
    // Code is not for this user
    console.log('Authenticated User does not match assigned name')
    res.status(400).json({ error: 'Your name is not assigned to this referral code'})
    return
  }

  console.log('Creating new order')
  let order = await createOrder(session.user.UserId)
  console.log('Setting code to redeemed')
  await redeemCode(exists.CodeId, session.user.UserId)
  res.json({ order: order })

}
