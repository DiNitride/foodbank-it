import db from "./db";

/* Get all users */
export async function getUsers() {
  let r = await db.query('SELECT * FROM User')
  db.end()
  return r
}

export async function getOneUserById(id) {
  let r = await db.query('SELECT * FROM User WHERE UserId = ?', [id])
  db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function updateUser(user) {
  
}

export async function getOneUserByUsernameOrEmail(query) {
  let r = await db.query('SELECT User.UserId, User.UserForename, User.UserSurname, User.UserUsername FROM User LEFT JOIN Client ON User.UserId = Client.ClientId WHERE User.UserUsername = ? OR Client.ClientEmail = ?;', [query, query])
  db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function getUserPassword(id) {
  let r = await db.query('SELECT User.UserPassword FROM User WHERE User.UserId = ?', [id])
  db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function getUserType(userId) {
  console.log(`Calculating user type for ${userId}`)
  let r = await db.query('SELECT User.UserID, Client.ClientId, Staff.StaffId, OrganisationStaff.StaffId AS OrgStaffId \
  FROM User \
  LEFT JOIN Client ON User.UserId = Client.ClientId \
  LEFT JOIN Staff ON User.UserId = Staff.StaffId \
  LEFT JOIN OrganisationStaff ON User.UserId = OrganisationStaff.StaffId \
  WHERE User.UserId = ?', [userId])
  console.log(r)
  let user = r[0]
  if (user.ClientId !== null) { return 'client' }
  if (user.StaffId !== null) { return 'staff' }
  if (user.OrgStaffId !== null) { return 'partner' }
}

/* Manage Client */
export async function getClients() {
  let r = await db.query('SELECT \
  User.UserForename, \
  User.Userurname, \
  User.UserUsernamea, \
  Client.ClientAddressLineOne, \
  Client.ClientAddressLineTwo, \
  Client.ClientAddressTown, \
  Client.ClientAddressPostcode, \
  Client.ClientPhone \
  FROM User \
  JOIN Client ON User.UserId = Client.ClientId')
  db.end()
  return r
}

export async function getOneClientByEmail(email) {
  let r = await db.query('SELECT \
  User.UserForename, \
  User.UserSurname, \
  User.UserUsername, \
  Client.ClientAddressLineOne, \
  Client.ClientAddressLineTwo, \
  Client.ClientAddressTown, \
  Client.ClientAddressPostcode, \
  Client.ClientPhone \
  Client.ClientEmail \
  FROM User \
  JOIN Client ON User.UserId = Client.ClientId \
  WHERE Client.ClientEmail = ?', [email])
  db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function getOneClientByUsername(username) {
  let r = await db.query('SELECT \
  User.UserForename, \
  User.UserSurname, \
  User.UserUsername, \
  Client.ClientAddressLineOne, \
  Client.ClientAddressLineTwo, \
  Client.ClientAddressTown, \
  Client.ClientAddressPostcode, \
  Client.ClientPhone \
  Client.ClientEmail \
  FROM User \
  JOIN Client ON User.UserId = Client.ClientId \
  WHERE User.UserUsername = ?', [username])
  db.end()
  if (r.length > 0) return r[0]
  return null
}

export async function getOneClientById(id) {
  let r = await db.query('SELECT \
  User.UserForename, \
  User.UserSurname, \
  User.UserUsername, \
  Client.ClientAddressLineOne, \
  Client.ClientAddressLineTwo, \
  Client.ClientAddressTown, \
  Client.ClientAddressPostcode, \
  Client.ClientPhone \
  Client.ClientEmail \
  FROM User \
  JOIN Client ON User.UserId = Client.ClientId \
  WHERE Client.ClientId = ?', [id])
  db.end()
  if (r.length > 0) return r[0]
  return null
}


export async function insertClient({ forename, surname, username, password, address_line_one, address_line_two, address_town, address_postcode, phone, email }) {
  await db.query('INSERT INTO `User` VALUES (NULL, ?, ?, ?, ?);', [ forename, surname, email, password])
  await db.query('INSERT INTO `Client` VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?);', [address_line_one, address_line_two, address_town, address_postcode, phone, email])
  db.end()
  return true
}


/* Manage staff */
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

export async function insertStaff({ forename, surname, username, password }) {
  await db.query('INSERT INTO `User` VALUES (NULL, ?, ?, ?, ?);', [ forename, surname, username, password])
  await db.query('INSERT INTO `staff` VALUES (LAST_INSERT_ID(), 0)')
  db.end()
  return true
}

export async function insertAdmin({ forename, surname, username, password }) {
  await db.query('INSERT INTO `User` VALUES (NULL, ?, ?, ?, ?);', [ forename, surname, username, password])
  await db.query('INSERT INTO `staff` VALUES (LAST_INSERT_ID(), 1)')
  db.end()
  return true
}
