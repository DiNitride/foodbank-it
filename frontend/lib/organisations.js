import db from './db'

export async function getOrganisations() {
  let r = await db.query('SELECT * FROM `Organisation`')
  return r
}

export async function getOneOrganisationById(id) {
  let r = await db.query('SELECT * FROM `Organisation` WHERE OrganisationId = ?', [id])
  let org = r[0]
  return org
}

export async function getUnapprovedOrganisations() {
  let r = await db.query('SELECT * FROM `Organisation` WHERE OrganisationApproved = 0')
  return r
}

export async function insertOrganisation(organisation) {
  await db.query('INSERT INTO `Organisation` VALUES (NULL, ?, ?, ?, ?, ?, ?, 0, NULL, ?, ?, ?, ?, ?)', [
    organisation.org_name,
    organisation.org_address_line_one,
    organisation.org_address_line_two,
    organisation.org_address_town,
    organisation.org_address_postcode,
    organisation.org_description,
    organisation.org_type,
    organisation.applicant_forename,
    organisation.applicant_surname,
    organisation.applicant_email,
    organisation.applicant_phone,
  ])
  db.end()
  return true
}

export async function approveOrganisation(id) {
  await db.query('UPDATE `Organisation` SET OrganisationApproved = 1 WHERE OrganisationId = ?', [id])
  db.end()
  return true
}