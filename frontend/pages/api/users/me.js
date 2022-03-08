import { getSession } from "next-auth/react"

// Returns the user information on themselves
export default async function me(req, res) {
  console.log(req.headers)
  console.log("Getting own user information")
  let session = await getSession({ req })
  console.log(session)
  if (!session) {
    res.status(401).json({ error: 'Login to access this resource'})
    return
  }
  let user = {
    id: '1553',
    forename: 'James',
    surname: 'Bale',
    address_line_one: 'Flat 3, 26 Queens Street',
    address_line_twp: '',
    address_city: 'Aberystwyth',
    address_postcode: 'SY23 1PU'
  }
  res.json(user)
}