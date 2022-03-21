import { getUsers } from "../../../lib/users";
import { getSession } from "next-auth/react";
import { getOrganisations, getUnapprovedOrganisations } from "../../../lib/organisations";

export default async function handler(req, res) {
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({error: 'You are not authorised to access this resource'})
  }
  let orgs = await getUnapprovedOrganisations()
  res.json(orgs)
}