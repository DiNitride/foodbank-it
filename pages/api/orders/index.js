import { getSession } from "next-auth/react"
import api from "../../../lib/api"
import { getOrders, getOrdersFor } from "../../../lib/orders"


export default api({
  'GET': {
    authenticated: true,
    roles: ['staff', 'client'],
    handler: get
  }
})

async function get(req, res, session) {
  let orders = []
  if (session.user.type === 'staff') {
    orders = await getOrders()
  }
  if (session.user.type === 'client' ) {
    orders = await getOrdersFor(session.user.UserId)
  }
  res.json(orders)
}
