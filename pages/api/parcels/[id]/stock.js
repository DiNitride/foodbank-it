import api from "../../../../lib/api"
import { assignItemToParcel, getStockForParcel, unassignItemToParcel } from "../../../../lib/stock"

export default api({
  'GET': {
    handler: get,
    roles: ['staff'],
    authenticated: true
  },
  'POST': {
    handler: post,
    roles: ['staff'],
    authenticated: true
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let stock = await getStockForParcel(id)
  res.json(stock)
}

async function post(req, res, session) {
  let { id } = req.query
  let { action, payload } = req.body
  if (action === 'add') {
    await assignItemToParcel(id, payload.stockId)
    res.json({ success: true })
  } else if (action ==='remove') {
    await unassignItemToParcel(id, payload.stockId)
    res.json({ success: true })
  } else {
    res.status(400).json({ error: 'Invalid post action' })
  }
}
