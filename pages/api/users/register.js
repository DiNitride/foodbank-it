import api from "../../../lib/api"
import { getOneClientByEmail, insertClient } from "../../../lib/clients"
import { hash } from "../../../lib/passwords"

export default api({
  'POST': {
    handler: post
  }
})

async function post(req, res, session) {
  let user = req.body
  let existingUser = await getOneClientByEmail(user.email)

  if (existingUser) {
    res.status(400).json({ 'error': 'A user with this email already exists' })
    return
  }

  let postcodeValidator = RegExp('^SY23\\s?[0-9]{1}[a-zA-Z]{2}$')
  if (!postcodeValidator.test(user.address_postcode)) {
    res.status(400).json({ 'error': 'Sorry, you must live within the SY23 postcode to use this service.' })
    return
  }

  user = {
    ...user,
    address_postcode: user.address_postcode.replace(' ', ''),
    phone: user.phone.replace(' ', '')
  }

  await insertClient(user)
  res.status(201).json({ success: true })
}
