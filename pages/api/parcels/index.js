import api from "../../../lib/api"
import { getParcels, createParcel } from "../../../lib/parcels"

export default api({
  'GET': {
    handler: get
  },
  'POST': {
    handler: post,
    authenticated: true,
    roles: ['staff']
  }
})

async function get(req, res, session) {
  let parcels = await getParcels()
  res.json(parcels)
}

async function post(req, res, session) {
  let parcelId = await createParcel()
  res.json({ parcelId: parcelId })
}
