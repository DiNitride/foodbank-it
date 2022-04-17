import api from "../../../lib/api"
import { deleteParcel, getParcel } from "../../../lib/parcels"

export default api({
  'GET': {
    handler: get
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

async function deleteHandler(req, res, session) {
  let { id } = req.query
  await deleteParcel(id)
  res.json({ success: true })
}
