import api from "../../../lib/api"
import { getCode } from "../../../lib/codes"

export default api({
  'GET': {
    handler: get
  }
})

async function get(req, res) {
  let { id } = req.query
  let code = await getCode(id)
  if (!code) {
    res.status(404).json({ error: `No code with ${id} found`})
    return
  }
  res.json({ code: code })
} 
