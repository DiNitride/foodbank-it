import api from "../../../lib/api"
import db from "../../../lib/db"
import { getStock, getStockByUnit, insertStock } from "../../../lib/stock"

export default api({
  'GET': {
    handler: get,
    role: ['staff'],
    authenticated: true
  },
  'POST': {
    handler: post,
    role: ['staff'],
    authenticated: true
  }
})

async function get(req, res, session) {
  let { unit } = req.query
  let stock
  if (unit) {
    stock = await getStockByUnit(unit)
  } else {
    stock = await getStock()
  }
  res.json(stock)
}

async function post(req, res, session) {
  let { useBy, quantity, unit } = req.body
  for (let i = 0; i < quantity; i++) {
    await insertStock(unit, session.user.UserId, useBy.slice(0, 10))
  }
  res.json({ success: true })
}
