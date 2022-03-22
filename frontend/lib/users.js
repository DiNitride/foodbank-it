import db from "./db";
import { hash } from "./passwords";

/* Get all users */
export async function getUsers() {
  let r = await db.query('SELECT * FROM User')
  db.end()
  return r
}

export async function getOneUserById(id) {
  let r = await db.query('SELECT * FROM User WHERE UserId = ?', [id])
  db.end()
  return r[0]
}

export async function getOneUserByUsername(username) {
  let r = await db.query('SELECT * FROM User WHERE UserUsername = ?', [username])
  db.end()
  return r[0]
}

export async function getOneUserByUsernameOrEmail(query) {
  console.log(query)
  let r = await db.query('SELECT User.UserId, User.UserForename, User.UserSurname, User.UserUsername FROM User LEFT JOIN Client ON User.UserId = Client.ClientId WHERE User.UserUsername = ? OR Client.ClientEmail = ?', [query, query])
  db.end()
  return r[0]
}

export async function getUserPassword(id) {
  let r = await db.query('SELECT User.UserPassword FROM User WHERE User.UserId = ?', [id])
  db.end()
  return r[0]
}

export async function getUserDetails(userId) {
  console.log(`Calculating user type for ${userId}`)
  let details = {}
  let r = await db.query('SELECT \
  User.UserID, \
  Client.ClientId, \
  Staff.StaffId, \
  Staff.Admin, \
  OrganisationStaff.StaffId AS OrgStaffId, \
  OrganisationStaff.OrganisationId AS OrgId, \
  Organisation.OrganisationType AS OrgType, \
  IF(User.UserID = Organisation.OrganisationManagerId, 1, 0) AS OrgManager \
  FROM User \
  LEFT JOIN Client ON User.UserId = Client.ClientId \
  LEFT JOIN Staff ON User.UserId = Staff.StaffId \
  LEFT JOIN OrganisationStaff ON User.UserId = OrganisationStaff.StaffId \
  LEFT JOIN Organisation ON OrganisationStaff.StaffId = Organisation.OrganisationManagerId \
  WHERE User.UserId = ?', [userId])
  let user = r[0]
  if (user.ClientId !== null) {
    console.log('Type Client')
    details = {
      ...details,
      type: 'client'
    }
  }
  if (user.StaffId !== null) {
    console.log('Type Staff')
    console.log(user.Admin)
    details = {
      ...details,
      type: 'staff',
      admin: user.Admin === 1 ? true : false
    }
  }
  if (user.OrgStaffId !== null) {
    console.log('Type Partner')
    details = {
      ...details,
      type: 'partner',
      org: user.OrgId,
      manager: user.OrgManager === 1 ? true : false,
      orgType: user.OrgType
    }
  }
  return details
}

export async function generateNewUser(forename, surname, password) {
  console.log('Creating new user...')
  console.log({ forename, surname, password })
  let hashedPassword = await hash(password)
  let username = ""
  let uniqueUsername = false
  do {
    console.log('Generating username')
    let number = Math.round(Math.random() * 100)
    username = `${forename.toLowerCase().replace(' ', '-')}.${surname.toLowerCase().replace(' ', '-')}.${number}`
    console.log(`Generated ${username}`)
    let existing = await getOneUserByUsername(username)
    if (!existing) {
      uniqueUsername = true
      console.log('Username unique!')
    }
  } while (!uniqueUsername)
  await db.query('INSERT INTO `User` VALUES (NULL, ?, ?, ?, ?)', [forename, surname, username, hashedPassword])
  console.log('Added user')
  return {
    forename: forename,
    surname: surname,
    password: password,
    username: username
  }
}
