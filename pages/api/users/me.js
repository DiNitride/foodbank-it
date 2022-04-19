import { getOneUserById, getUser, getUserDetails, getUserPassword, updateUserDetails, updateUserPassword } from "../../../lib/users"
import api from "../../../lib/api"
import { getOneOrganisationById } from "../../../lib/organisations"
import { getClientContactDetails } from "../../../lib/clients"

export default api({
  'GET': {
    authenticated: true,
    handler: get
  }
})

async function get(req, res, session) {
  let user = await getOneUserById(session.user.UserId)
  let details = await getUserDetails(user.UserId)
  let org = {};
  let contactDetails = {};

  if (details.type === 'partner') {
    org = await getOneOrganisationById(details.org)
  }

  if (details.type === 'client') {
    contactDetails = await getClientContactDetails(user.UserId)
  }

  res.json({
    ...user,
    ...details,
    organisation: org,
    contact: contactDetails
  })
}
