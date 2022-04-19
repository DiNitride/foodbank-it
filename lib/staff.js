import db from "./db"
import { generateNewUser } from "./users"

export async function getStaff() {
  let r = await db.query('SELECT User.UserId, \
  User.UserUsername, \
  User.UserForename, \
  User.UserSurname, \
  Staff.Admin \
  FROM User JOIN Staff ON User.UserId = Staff.StaffId')
  await db.end()
  return r
}

export async function getOneStaffById(id) {
  let r = await db.query('SELECT User.UserId, \
  User.UserUsername, \
  User.UserForename, \
  User.UserSurname, \
  Staff.Admin \
  FROM User JOIN Staff ON User.UserId = Staff.StaffId WHERE Staff.StaffId = ?', [id])
  await db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function insertStaff({ forename, surname, password }) {
  let user = await generateNewUser(forename, surname, password)
  await db.query('INSERT INTO `staff` VALUES (LAST_INSERT_ID(), 0)')
  let staff = await getOneStaffById(user.id)
  await db.end()
  return staff
}

export async function insertAdmin({ forename, surname, password }) {
  let user = await generateNewUser(forename, surname, password)
  await db.query('INSERT INTO `staff` VALUES (LAST_INSERT_ID(), 1)')
  await db.end()
}
