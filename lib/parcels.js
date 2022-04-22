import db from './db'

export async function getParcels() {
  let parcels = await db.query(`
  SELECT Parcel.ParcelId,
  ParcelComplete,
  ParcelDetails,
  Order.OrderId,
  IF(IFNULL(Order.OrderId, 0) AND Order.OrderStatus != 'open', 1, 0) AS ParcelUsed,
  ParcelItemCount
  FROM Parcel
  LEFT JOIN \`Order\` ON Order.OrderParcel = Parcel.ParcelId
  LEFT JOIN (SELECT ParcelId, COUNT(StockId) AS ParcelItemCount FROM ParcelItem GROUP BY ParcelId) c ON Parcel.ParcelId = c.ParcelId
  `)
  await db.end()
  return parcels
}

export async function getCompleteParcels() {
  let parcels = await getParcels()
  parcels = parcels.reduce((arr, parcel) => {
    return parcel.ParcelComplete === 1 ? [ ...arr, parcel] : arr
  }, [])
  return parcels
}

export async function getIncompleteParcels() {
  let parcels = await getParcels()
  parcels = parcels.reduce((arr, parcel) => {
    return parcel.ParcelComplete === 0 ? [ ...arr, parcel] : arr
  }, [])
  return parcels
}

// Parcels that are complete AND not used
export async function getAvailableParcels() {
  let parcels = await getParcels()
  parcels = parcels.reduce((arr, parcel) => {
    return parcel.ParcelComplete === 1 && parcel.ParcelUsed === 0 ? [ ...arr, parcel] : arr
  }, [])
  return parcels
}

export async function getUnusedParcels() {
  let parcels = await getParcels()
  parcels = parcels.reduce((arr, parcel) => {
    return parcel.ParcelUsed === 0 ? [ ...arr, parcel] : arr
  }, [])
  return parcels
}

export async function getParcel(id) {
  let parcels = await db.query('SELECT ParcelId, ParcelComplete, ParcelDetails FROM Parcel WHERE ParcelId = ?', [id])
  await db.end()
  return parcels[0]
}

export async function updateParcelStatus(id, complete) {
  let binaryComplete = complete ? 1 : 0
  await db.query('UPDATE Parcel SET ParcelComplete = ? WHERE ParcelId = ?', [binaryComplete, id])
  await db.end()
}

export async function updateParcel(id, complete, details) {
  await db.query('UPDATE Parcel SET ParcelComplete = ?, ParcelDetails = ? WHERE ParcelId = ?', [complete, details, id])
  await db.end()
}

export async function createParcel() {
  let { insertId } = await db.query('INSERT INTO Parcel VALUES (NULL, 0, \'\')')
  await db.end()
  return insertId
}

export async function deleteParcel(id) {
  await db.query('DELETE FROM Parcel WHERE ParcelId = ?', [id])
  await db.end()
}
