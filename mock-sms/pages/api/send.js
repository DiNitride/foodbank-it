import db from '../../lib/db'

export default async function handler(req, res) {
  let { number, message } = req.body
  console.log(`Recieved SMS for ${number}`)
  let details = await db.query('SELECT NumberId FROM Number WHERE NumberValue = ?', [number])
  if (details.length === 0) {
    res.status(400).json({ error: 'Number does not exist in DB' })
    return
  }
  let id = details[0].NumberId
  let { insertId } = await db.query('INSERT INTO Message VALUES (NULL, ?, ?, NOW())', [id, message])
  db.end()
  res.json({ messageId: insertId })
}
