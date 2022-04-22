import db from "./db";

export async function getStockUnits() {
  let stockUnits = await db.query('SELECT UnitId, UnitName, UnitSize FROM StockUnit')
  await db.end()
  return stockUnits
}

export async function getStockUnitById(id) {
  let stockUnits = await db.query('SELECT UnitId, UnitName, UnitSize FROM StockUnit WHERE UnitId = ?', [id])
  await db.end()
  return stockUnits[0]
}

export async function insertStockUnit(unitName, unitSize) {
  await db.query('INSERT INTO StockUnit VALUES (NULL, ?, ?)', [unitName, unitSize])
  await db.end()
}

export async function deleteStockUnit(id) {
  await db.query('DELETE FROM StockUnit WHERE UnitId = ?', [id])
  await db.end()
}

