import db from "./db"

export async function getStaff() {
  let r = await db.query('SELECT * FROM User JOIN Staff ON User.UserId = Staff.StaffId')
  db.end()
  return r
}

export async function getOneStaffById(id) {
  let r = await db.query('SELECT * FROM User JOIN Staff ON User.UserId = Staff.StaffId WHERE Staff.StaffId = ?', [userId])
  db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function insertStaff({ forename, surname, password }) {
  await generateNewUser(forename, surname, password)
  await db.query('INSERT INTO `staff` VALUES (LAST_INSERT_ID(), 0)')
  db.end()
  return true
}

export async function insertAdmin({ forename, surname, password }) {
  await generateNewUser(forename, surname, password)
  await db.query('INSERT INTO `staff` VALUES (LAST_INSERT_ID(), 1)')
  db.end()
  return true
}
