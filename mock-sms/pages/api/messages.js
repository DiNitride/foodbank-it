import db from '../../lib/db'

export default async function handler(req, res) {
  let { number } = req.query
  let messages  = await db.query('SELECT MessageId, MessageValue, MessageTimestamp, DATE_FORMAT(MessageTimestamp, "%H:%i %W %M %Y") as PrettyMessageTimestamp FROM Message WHERE Message.MessageNumber = ? ORDER BY MessageTimestamp DESC', [number])
  await db.end()
  res.json(messages)
}
