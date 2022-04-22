import OrderDetails from '../components/OrderDetails'
import db from './db'

let fields = `
Stock.StockId,
CreatedOn, DATE_FORMAT(CreatedOn, "%H:%i %W %M %Y") as PrettyCreatedOn,
UseBy, DATE_FORMAT(UseBy, "%W %D %M %Y") as PrettyUseBy,
UserForename AS CreatedByForename,
UserSurname AS CreatedBySurname,
Stock.UnitId,
StockUnit.UnitName,
StockUnit.UnitSize,
ParcelItem.ParcelId,
Order.OrderStatus
`

export async function getStock() {
  let stock = await db.query(`
  SELECT ${fields}
  FROM Stock
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  LEFT JOIN ParcelItem ON Stock.StockId = ParcelItem.StockId
  LEFT JOIN \`Order\` ON Order.OrderParcel = ParcelItem.ParcelId
  WHERE Order.OrderStatus = 'open' OR Order.OrderStatus IS NULL
  ORDER BY CreatedOn
  `)
  await db.end()
  return stock
}

export async function getStockById(id) {
  let stock = await db.query(`
  SELECT ${fields}
  FROM Stock
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  LEFT JOIN ParcelItem ON Stock.StockId = ParcelItem.StockId
  LEFT JOIN \`Order\` ON Order.OrderParcel = ParcelItem.ParcelId
  WHERE Stock.StockId = ?
  `, [id])
  await db.end()
  return stock
}

export async function getStockByUnit(unitId) {
  let stock = await db.query(`
  SELECT ${fields}
  FROM Stock
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  LEFT JOIN ParcelItem ON Stock.StockId = ParcelItem.StockId
  LEFT JOIN \`Order\` ON Order.OrderParcel = ParcelItem.ParcelId
  WHERE Stock.UnitId = ? AND Order.OrderStatus <> 'closed' OR Order.OrderStatus IS NULL
  ORDER BY CreatedOn
  `, [unitId])
  await db.end()
  return stock
}

export async function insertStock(unitId, userId, useBy) {
  await db.query('INSERT INTO Stock VALUES (NULL, ?, ?, NOW(), ?)', [unitId, userId, useBy])
  await db.end()
}

export async function deleteStock(id) {
  await db.query('DELETE FROM Stock WHERE StockId = ?', [id])
  await db.end()
}

export async function getStockForParcel(parcelId) {
  let items = await db.query(`
  SELECT ${fields}
  FROM ParcelItem
  JOIN Stock ON ParcelItem.StockId = Stock.StockId
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  LEFT JOIN \`Order\` ON Order.OrderParcel = ParcelItem.ParcelId
  WHERE ParcelItem.ParcelId = ?
  ORDER BY Stock.CreatedOn
  `, [parcelId])
  await db.end()
  return items
}


export async function getUnassignedStock() {
  let items = await db.query(`
  SELECT ${fields}
  FROM Stock
  LEFT JOIN ParcelItem ON ParcelItem.StockId = Stock.StockId
  JOIN User ON Stock.CreatedBy = User.UserId
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  LEFT JOIN \`Order\` ON Order.OrderParcel = ParcelItem.ParcelId
  WHERE ParcelItem.ParcelId IS NULL
  ORDER BY Stock.CreatedOn
  `)
  await db.end()
  return items
}

export async function getUnassignedStockByUnit(unitId) {
  let items = await db.query(`
  SELECT ${fields}
  FROM Stock
  LEFT JOIN ParcelItem ON ParcelItem.StockId = Stock.StockId
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  LEFT JOIN \`Order\` ON Order.OrderParcel = ParcelItem.ParcelId
  WHERE ParcelItem.ParcelId IS NULL AND StockUnit.UnitId = ?
  ORDER BY Stock.CreatedOn
  `, [unitId])
  await db.end()
  return items
}

export async function assignItemToParcel(parcelId, stockId) {
  await db.query('INSERT INTO ParcelItem VALUES (?, ?)', [parcelId, stockId])
  await db.end()
}

export async function unassignItemToParcel(parcelId, stockId) {
  await db.query('DELETE FROM ParcelItem WHERE ParcelId = ? AND StockId = ?', [parcelId, stockId])
  await db.end()
}

