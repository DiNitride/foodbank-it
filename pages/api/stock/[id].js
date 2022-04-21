import api from "../../../lib/api"
import { deleteStock, getStockById } from "../../../lib/stock"

export default api({
  'GET': {
    handler: get,
    role: ['staff'],
    authenticated: true
  },
  'DELETE': {
    handler: _delete,
    role: ['staff'],
    authenticated: true
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let stock = await getStockById(id)
  res.json(stock)
}

async function _delete(req, res, session) {
  let { id } = req.query
  await deleteStock(id)
  res.json({ success: true })
}
