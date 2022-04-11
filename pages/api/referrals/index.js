import { getSession } from "next-auth/react";
import { getCodes, getCodesCreatedByUser, getCodesFromOrg } from "../../../lib/codes";

export default async function handler(req, res) {
  console.log('Getting codes')
  let session = await getSession({ req })
  if (!session) {
    res.status(401).json({error: 'You are not authorised to access this resource'})
    return
  }
  
  let codes = []
  if (session.user.type === 'staff' && session.user.admin === true) {
    codes = await getCodes()
  }
  if (session.user.type === 'partner' && session.user.orgType === 'support' ) {
    codes = await getCodesCreatedByUser(session.user.UserId)
  }
  res.json(codes)
}