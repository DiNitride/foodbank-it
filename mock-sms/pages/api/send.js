import db from '../../lib/db'

export default async function handler(req, res) {
  let { number, message } = req.body
  console.log(`Recieved SMS for ${number}`)
  let { insertId } = await db.query('INSERT INTO Message VALUES (NULL, ?, ?, NOW())', [number, message])
  await db.end()
  res.json({ messageId: insertId })
}
