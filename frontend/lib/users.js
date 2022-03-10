import db from "./db_conn";

export async function getUsers() {
  let r = await db.query('SELECT * FROM users')
  db.end()
  return r
}

export async function getUser(id) {
  let r = await db.query('SELECT * FROM users WHERE userId = ?', [id])
  db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function getUserByEmail(email) {
  let r = await db.query('SELECT * FROM users WHERE email = ?', [email])
  db.end()
  if (r.length > 0) return r[0]
  return null
}