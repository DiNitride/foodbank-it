import { getUsers } from "../../../lib/users";
import { getSession } from "next-auth/react";
import { getOrganisations } from "../../../lib/organisations";

export default async function handler(req, res) {
  console.log('Getting organisations')
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({error: 'You are not authorised to access this resource'})
    return
  }
  
  let orgs = await getOrganisations()
  res.json(orgs)
}