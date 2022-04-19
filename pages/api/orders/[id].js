import { getSession } from "next-auth/react"
import api from "../../../lib/api"
import { deleteOrder, getOrder, setOrderParcel, setOrderPending, setOrderClosed } from "../../../lib/orders"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff', 'client'],
    handler: get
  },
  'POST': {
    authenticated: true,
    roles: ['staff'],
    handler: post
  },
  'DELETE': {
    authenticated: true,
    roles: ['staff', 'client'],
    handler: deleteHandler
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let order = await getOrder(id)
  if (session.user.type === 'staff' || order.OrderClient === session.user.UserId) {
    res.json(order)
  } else {
    res.status(403).json({ error: 'You cannot access this order' })
  }
}

async function post(req, res, session) {
  let { id } = req.query
  let { action, payload } = req.body
  if (action === 'setParcel') {
    await setOrderParcel(id, payload.parcelId)
    res.json({ success: true, parcelId: payload.parcelId })
  } else if (action === 'setPending') {
    await setOrderPending(id)
    res.json({ success: true })
  } else if (action === 'closeOrder') {
    await setOrderClosed(id)
    res.json({ success: true })
  }
}

async function deleteHandler(req, res, session) {
  let { id } = req.query
  let order = await getOrder(id)
  console.log(order)
  console.log(session.user)
  if (session.user.type === 'staff' || order.UserId === session.user.UserId) {
    await deleteOrder(id)
    res.json({ success: true })
  } else {
    res.status(403).json({ error: 'You cannot delete this order' })
  }
}
