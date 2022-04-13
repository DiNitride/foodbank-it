import db from './db'

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

export async function deleteOrder() {

}

export async function updateOrder() {

}
