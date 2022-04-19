import db from './db'
import { hash } from './passwords'
import { generateNewUser } from './users'
import { sendSms } from './sms'

export async function getOrganisations() {
  let r = await db.query('SELECT Organisation.*, \
  User.UserForename AS OrganisationManagerForename \
  FROM `Organisation` \
  JOIN `User` ON Organisation.OrganisationManagerId = User.UserId \
  WHERE OrganisationApproved = 1')
  await db.end()
  return r
}

export async function getOneOrganisationById(id) {
  let r = await db.query('SELECT * FROM `Organisation` WHERE OrganisationId = ?', [id])
  let org = r[0]
  await db.end()
  return org
}

export async function getUnapprovedOrganisations() {
  let r = await db.query('SELECT * FROM `Organisation` WHERE OrganisationApproved = 0')
  await db.end()
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
  await db.end()
  return true
}

export async function approveOrganisation(id) {
  let org = await getOneOrganisationById(id)
  let user = await generateNewUser(org.OrganisationApplicantForename, org.OrganisationApplicantSurname, 'password')
  await sendSms(org.OrganisationApplicantPhone, `Hi, your organisation application has been approved! A manager account has been created for ${org.ApplicantForename} with the following details.\n\nUsername: ${user.username}\nPassword: password\n\nPlease log in now and change your password!`)
  await db.query('INSERT INTO `OrganisationStaff` VALUES (LAST_INSERT_ID(), ?)', [id])
  await db.query('UPDATE `Organisation` SET OrganisationApproved = 1, OrganisationManagerId = LAST_INSERT_ID() WHERE OrganisationId = ?', [id])
  await db.end()
  return true
}

export async function deleteOrganisation(id) {
  await db.query('DELETE FROM `Organisation` WHERE OrganisationId = ? ', [id])
  await db.end()
  return true
}

export async function getStaffForOrg(id) {
  let staff = await db.query('SELECT User.UserId, User.UserUsername, User.UserForename, User.UserSurname FROM User JOIN OrganisationStaff ON User.UserId = OrganisationStaff.StaffId WHERE OrganisationStaff.OrganisationId = ?', [id])
  await db.end()
  return staff
}
