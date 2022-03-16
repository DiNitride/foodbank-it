import { hash } from "../../lib/passwords"

export default async function handler( req, res ) {
  if (process.env.NODE_ENV === 'development') {
    let { pw } = req.query
    let hashed = await hash(pw)
    res.json({ 'hash': hashed })
  }
}