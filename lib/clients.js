import db from "./db"
import { generateNewUser } from './users'

export async function getClients() {
  let r = await db.query('SELECT \
  User.UserUsername, \
  User.UserId, \
  User.UserForename, \
  User.UserSurname, \
  User.UserUsername, \
  Client.ClientAddressLineOne, \
  Client.ClientAddressLineTwo, \
  Client.ClientAddressTown, \
  Client.ClientAddressPostcode, \
  Client.ClientPhone, \
  Client.ClientEmail \
  FROM User \
  JOIN Client ON User.UserId = Client.ClientId')
  await db.end()
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
  Client.ClientPhone, \
  Client.ClientEmail \
  FROM User \
  JOIN Client ON User.UserId = Client.ClientId \
  WHERE Client.ClientEmail = ?', [email])
  await db.end()
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
  await db.end()
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
  Client.ClientPhone, \
  Client.ClientEmail \
  FROM User \
  JOIN Client ON User.UserId = Client.ClientId \
  WHERE Client.ClientId = ?', [id])
  await db.end()
  if (r.length > 0) return r[0]
  return null
}


export async function insertClient({ forename, surname, password, address_line_one, address_line_two, address_town, address_postcode, phone, email }) {
  await generateNewUser(forename, surname, password)
  await db.query('INSERT INTO `Client` VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?);', [address_line_one, address_line_two, address_town, address_postcode, phone, email])
  await db.end()
  return true
}

export async function getClientContactDetails(id) {
  let r = await db.query('SELECT \
  Client.ClientAddressLineOne, \
  Client.ClientAddressLineTwo, \
  Client.ClientAddressTown, \
  Client.ClientAddressPostcode, \
  Client.ClientPhone, \
  Client.ClientEmail \
  FROM Client \
  WHERE Client.ClientId = ?', [id])
  await db.end()
  return r[0]
}
