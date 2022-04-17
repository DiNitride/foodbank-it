import db from '../../lib/db'

export default async function handler(req, res) {
  let { pin } = req.query
  let details = await db.query('SELECT NumberId FROM Number WHERE NumberPin = ?', [pin])
  if (details.length === 0) {
    res.status(400).json({ error: 'Pin could not be matched to a number in the DB' })
    return
  }
  let id = details[0].NumberId
  let messages  = await db.query('SELECT MessageId, MessageValue, MessageTimestamp, DATE_FORMAT(MessageTimestamp, "%H:%i %W %M %Y") as PrettyMessageTimestamp FROM Message WHERE Message.NumberId = ? ORDER BY MessageTimestamp DESC', [id])
  db.end()
  res.json(messages)
}
