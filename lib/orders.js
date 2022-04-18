import db from './db'
import { sendSms } from './sms'
import { getOneClientById } from './clients'

export async function getOrders() {
  let orders = await db.query('SELECT Order.OrderId, \
  Order.OrderStatus, \
  Order.OrderParcel, \
  Order.OrderOpened, \
  Order.OrderClosed, \
  DATE_FORMAT(Order.OrderOpened, "%H:%i %W %M %Y") as PrettyOrderOpened, \
  DATE_FORMAT(Order.OrderClosed, "%H:%i %W %M %Y") as PrettyOrderClosed, \
  User.UserId, \
  User.UserForename, \
  User.UserSurname \
  FROM `Order` \
  JOIN User ON Order.OrderClient = User.UserId')
  db.end()
  return orders
}

export async function getOrder(orderId) {
  let orders = await db.query('SELECT Order.OrderId, \
  Order.OrderStatus, \
  Order.OrderParcel, \
  Order.OrderOpened, \
  Order.OrderClosed, \
  DATE_FORMAT(Order.OrderOpened, "%H:%i %W %M %Y") as PrettyOrderOpened, \
  DATE_FORMAT(Order.OrderClosed, "%H:%i %W %M %Y") as PrettyOrderClosed, \
  User.UserId, \
  User.UserForename, \
  User.UserSurname \
  FROM `Order` \
  JOIN User ON Order.OrderClient = User.UserId \
  WHERE Order.OrderId = ?', [orderId])
  db.end()
  return orders[0]
}

export async function getOrdersFor(userId) {
  let orders = await db.query('SELECT Order.OrderId, \
  Order.OrderStatus, \
  Order.OrderParcel, \
  Order.OrderOpened, \
  Order.OrderClosed, \
  DATE_FORMAT(Order.OrderOpened, "%H:%i %W %M %Y") as PrettyOrderOpened, \
  DATE_FORMAT(Order.OrderClosed, "%H:%i %W %M %Y") as PrettyOrderClosed, \
  User.UserId, \
  User.UserForename, \
  User.UserSurname \
  FROM `Order` \
  JOIN User ON Order.OrderClient = User.UserId \
  WHERE Order.OrderClient = ?', [userId])
  db.end()
  return orders
}

export async function createOrder(userId) {
  let { insertId } = await db.query('INSERT INTO `Order` VALUES (NULL, ?, "Open", NULL, NOW(), NULL)', [userId])
  let order = await getOrder(insertId)
  db.end()
  return order
}

export async function deleteOrder(id) {
  await db.query('DELETE FROM `Order` WHERE OrderId = ?', [id])
  db.end()
}

export async function setOrderParcel(orderId, parcelId) {
  await db.query('UPDATE `Order` SET OrderParcel = ? WHERE OrderId = ?', [parcelId, orderId])
  // let order = await getOrder(orderId)
  // let client = await getOneClientById(order.OrderClient)
  // await sendSms(client.ClientPhone, `Your parcel for order #${order.OrderId} is ready for collection.`)
  db.end()
}

export async function setOrderPending(orderId) {
  await db.query('UPDATE `Order` SET OrderStatus = \'ready\' WHERE OrderId = ?', [orderId])
  let order = await getOrder(orderId)
  let client = await getOneClientById(order.UserId)
  await sendSms(client.ClientPhone, `Your parcel for order #${order.OrderId} is ready for collection.`)
  db.end()
}

export async function setOrderClosed(orderId) {
  await db.query('UPDATE `Order` SET OrderStatus = \'closed\', OrderClosed = NOW() WHERE OrderId = ?', [orderId])
  let order = await getOrder(orderId)
  let client = await getOneClientById(order.UserId)
  await sendSms(client.ClientPhone, `Thanks for collecting order #${order.OrderId}. Your order is now complete.`)
  db.end()
}
