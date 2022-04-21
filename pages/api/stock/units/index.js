import api from "../../../../lib/api"
import { getStockUnits, insertStockUnit } from "../../../../lib/stock-unit"

export default api({
  'GET': {
    authenticated: true,
    roles: ['staff'],
    handler:  get
  },
  'POST': {
    authenticated: true,
    roles: ['staff'],
    handler: post
  }
})

async function get(req, res, session) {
  let stockUnits = await getStockUnits()
  res.json(stockUnits)
}

async function post(req, res, session) {
  let { unitName, unitSize } = req.body
  await insertStockUnit(unitName, unitSize)
  res.json({ success: true })
}
