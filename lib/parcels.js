import db from './db'

export async function getParcels() {
  let parcels = await db.query('SELECT * FROM Parcel')
  db.end()
  return parcels
}

export async function getParcel(id) {
  let parcels = await db.query('SELECT * FROM Parcel WHERE ParcelId = ?', [id])
  db.end()
  return parcels[0]
}

export async function updateParcelStatus(id, complete) {
  let binaryComplete = complete ? 1 : 0
  await db.query('UPDATE Parcel SET ParcelComplete = ? WHERE ParcelId = ?', [binaryComplete, id])
  db.end()
  return parcels
}

export async function createParcel() {
  let { insertId } = await db.query('INSERT INTO Parcel VALUES (NULL, 0)')
  console.log(db.end())
  return insertId
}

export async function deleteParcel(id) {
  await db.query('DELETE FROM Parcel WHERE ParcelId = ?', [id])
  db.end()
}
