import api from "../../../lib/api"
import { setOrderParcel } from "../../../lib/orders"
import { deleteParcel, getParcel, updateParcelStatus } from "../../../lib/parcels"

export default api({
  'GET': {
    handler: get
  },
  'POST': {
    handler: post,
    authenticated: true,
    roles: ['staff']
  },
  'DELETE': {
    handler: deleteHandler,
    authenticated: true,
    roles: ['staff']
  }
})

async function get(req, res, session) {
  let { id } = req.query
  let parcels = await getParcel(id)
  res.json(parcels)
}

async function post(req, res, session) {
  let { id } = req.query
  let { complete } = req.body
  await updateParcelStatus(id, complete)
  res.json({ success: true })
}

async function deleteHandler(req, res, session) {
  let { id } = req.query
  await deleteParcel(id)
  res.json({ success: true })
}
