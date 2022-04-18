import { faCropSimple } from "@fortawesome/free-solid-svg-icons"
import api from "../../../lib/api"
import { setOrderParcel } from "../../../lib/orders"
import { deleteParcel, getParcel, updateParcel } from "../../../lib/parcels"

export default api({
  'GET': {
    handler: get
  },
  'PATCH': {
    handler: patch,
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

async function patch(req, res, session) {
  let { id } = req.query
  let { complete, details } = req.body
  await updateParcel(id, complete, details)
  res.json({ success: true, parcel: req.body })
}

async function deleteHandler(req, res, session) {
  let { id } = req.query
  await deleteParcel(id)
  res.json({ success: true })
}
