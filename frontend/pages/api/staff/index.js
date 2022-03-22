import { getSession } from "next-auth/react";
import { getClients } from "../../../lib/clients";
import { getStaff } from "../../../lib/staff";

export default async function handler(req, res) {
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({error: 'You are not authorised to access this resource'})
  }
  let staff = await getStaff()
  res.json(staff)
}