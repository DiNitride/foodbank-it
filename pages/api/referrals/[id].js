import { getCode } from "../../../lib/codes"

export default async function handler(req, res) {
    let { id } = req.query
    let code = await getCode(id)
    if (!code) {
        res.status(404).json({ error: `No code with ${id} found`})
        return
    }
    res.json(code)
} 