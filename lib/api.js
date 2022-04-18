import { getSession } from "next-auth/react";

// Roles:
// staff - any staff
// admin - admin only
// partner - any partner
// supplier - any supplier partner
// support - any support partner
// self - only access own resources. i.e. /users/[id] -> only user with id can access
//
export default function api(config) {
  return async (req, res) => {
    console.log(`${req.method} - ${req.url}`)
    let session = await getSession({ req })

    if (!config[req.method]) {
      res.status(405).json({ error: 'Method Not Allowed'})
      return
    } else {
      let { authenticated, roles, handler } = config[req.method]
      if (!authenticated) {
        await handler(req, res, session)
        return
      }
      
      if (authenticated && !session) {
        res.status(401).json({ error: 'Unauthorised. Login to access this resource.' })
        return
      }

      if (authenticated && roles) {
        // Check specifics
        for (let role of roles) {
          // console.log(`Checking role: ${role}`)
          if (await role_validators[role](req, session)) {
            try {
              await handler(req, res, session)
            } catch (e) {
              console.error(e)
              res.status(500).json({ error: 'Server Error - Something went wrong.'})
            }
            return
          }
        }
      }

      res.status(403).json({ error: 'Forbidden' })
      return
    }
  }
}

let role_validators = {
  'staff': async (req, session) => ( session.user.type === 'staff' ),
  'admin': async (req, session) => ( session.user.type === 'staff' && session.user.admin ),
  'partner': async (req, session) => ( session.user.type === 'partner' ),
  'support': async (req, session) => ( session.user.type === 'partner' && session.user.orgType === 'support' ),
  'supplier': async (req, session) => ( session.user.type === 'partner' && session.user.orgType === 'supplier' ),
  'client': async (req, session) => ( session.user.type === 'client' ),
  'self': async (req, session) => {
    let { id } = req.query
    return id === session.user.UserId
  }
}
