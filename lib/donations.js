import db from './db'

export async function getStockDonations() {
  let donations = await db.query('SELECT OrganisationDonation.DonationId, \
  OrganisationDonation.DonationText, \
  OrganisationDonation.DonationReviewed, \
  Organisation.OrganisationName, \
  User.UserForename, \
  User.UserSurname \
  FROM `OrganisationDonation` \
  LEFT JOIN Organisation ON OrganisationDonation.OrganisationId = Organisation.OrganisationId \
  LEFT JOIN User ON OrganisationDonation.StaffID = User.UserId')
  db.end()
  return donations
}

export async function insertStockDonation(text, userId, orgId) {
  let donation = await db.query('INSERT INTO OrganisationDonation VALUES \
  (NULL, ?, ?, ?, 0)', [orgId, userId, text])
  return donation
}