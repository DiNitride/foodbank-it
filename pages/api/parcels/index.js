import api from "../../../lib/api"
import { getParcels, createParcel, getCompleteParcels, getIncompleteParcels, getAvailableParcels, getUnusedParcels } from "../../../lib/parcels"

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
  let { filter } = req.query
  let parcels
  if (!filter) {
    parcels = await getParcels()
  } else if (filter === 'complete') {
    parcels = await getCompleteParcels()
  } else if (filter === 'incomplete') {
    parcels = await getIncompleteParcels() 
  } else if (filter === 'available') {
    parcels = await getAvailableParcels()
  } else if (filter === 'unused') {
    parcels = await getUnusedParcels()
  }
  res.json(parcels)
}

async function post(req, res, session) {
  let parcelId = await createParcel()
  res.json({ parcelId: parcelId })
}
