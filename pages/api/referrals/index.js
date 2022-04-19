import { getSession } from "next-auth/react";
import api from "../../../lib/api";
import { getCodes, getCodesCreatedByUser, getCodesFromOrg } from "../../../lib/codes";

export default api({
  'GET': {
    authentication: true,
    roles: ['staff', 'support'],
    handler: get
  }
})

async function get(req, res, session) {
  let { filter } = req.query
  let codes = []
  if (session.user.type === 'staff' && session.user.admin === true) {
    codes = await getCodes()
  }
  if (session.user.type === 'partner' && session.user.orgType === 'support' ) {
    codes = await getCodesCreatedByUser(session.user.UserId)
    if (filter === 'unredeemed') {
      codes = codes.reduce((arr, code) => {
        return code.Redeemed ? arr : [ ...arr, code ]
      }, [])
    } 
  }
  res.json(codes)
}
