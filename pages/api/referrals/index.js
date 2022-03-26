import { getSession } from "next-auth/react";
import { getCodes } from "../../../lib/codes";

export default async function handler(req, res) {
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({error: 'You are not authorised to access this resource'})
    return
  }
  
  let codes = getCodes()
  res.json(codes)
}