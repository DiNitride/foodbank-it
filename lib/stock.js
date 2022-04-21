import db from './db'

export async function getStock() {
  let stock = await db.query(`
  SELECT StockId,
  CreatedOn, DATE_FORMAT(CreatedOn, "%H:%i %W %M %Y") as PrettyCreatedOn,
  UseBy, DATE_FORMAT(UseBy, "%W %D %M %Y") as PrettyUseBy,
  UserForename AS CreatedByForename,
  UserSurname AS CreatedBySurname,
  Stock.UnitId,
  UnitName,
  UnitSize
  FROM Stock
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  `)
  await db.end()
  return stock
}

export async function getStockById(id) {
  let stock = await db.query(`
  SELECT StockId,
  CreatedOn, DATE_FORMAT(CreatedOn, "%H:%i %W %M %Y") as PrettyCreatedOn,
  UseBy, DATE_FORMAT(UseBy, "%W %D %M %Y") as PrettyUseBy,
  UserForename AS CreatedByForename,
  UserSurname AS CreatedBySurname,
  Stock.UnitId,
  UnitName,
  UnitSize
  FROM Stock
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  WHERE StockId = ?
  `, [id])
  await db.end()
  return stock
}

export async function getStockByUnit(unitId) {
  let stock = await db.query(`
  SELECT StockId,
  CreatedOn, DATE_FORMAT(CreatedOn, "%H:%i %W %M %Y") as PrettyCreatedOn,
  UseBy, DATE_FORMAT(UseBy, "%W %D %M %Y") as PrettyUseBy,
  UserForename AS CreatedByForename,
  UserSurname AS CreatedBySurname,
  Stock.UnitId,
  UnitName,
  UnitSize
  FROM Stock
  JOIN StockUnit ON Stock.UnitId = StockUnit.UnitId
  JOIN User ON Stock.CreatedBy = User.UserId
  WHERE Stock.UnitId = ?
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
