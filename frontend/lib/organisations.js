import db from './db'
import { hash } from './passwords'
import { generateNewUser } from './users'

export async function getOrganisations() {
  let r = await db.query('SELECT Organisation.*, \
  User.UserForename AS OrganisationManagerForename \
  FROM `Organisation` \
  JOIN `User` ON Organisation.OrganisationManagerId = User.UserId \
  WHERE OrganisationApproved = 1')
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
  console.log('Approving organsation')
  let org = await getOneOrganisationById(id)
  await generateNewUser(org.OrganisationApplicantForename, org.OrganisationApplicantSurname, 'password')
  await db.query('INSERT INTO `OrganisationStaff` VALUES (LAST_INSERT_ID(), ?)', [id])
  await db.query('UPDATE `Organisation` SET OrganisationApproved = 1, OrganisationManagerId = LAST_INSERT_ID() WHERE OrganisationId = ?', [id])
  db.end()
  return true
}

export async function deleteOrganisation(id) {
  await db.query('DELETE FROM `Organisation` WHERE OrganisationId = ? ', [id])
  db.end()
  return true
}