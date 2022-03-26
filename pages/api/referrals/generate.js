import { generateCode, getCode, insertCode } from "../../../lib/codes"

export default async function generate(req, res) {
  console.log('Generating referral code')
  // if (req.method !== 'POST') {
  //     res.status(405).json({ error: 'Method not allowed' })
  // }
  let counter = 0
  let code = ''
  do {
    console.log(counter)
    if (counter > 250) {
      // Crash
      res.status(500).json({ error: 'An error occured while generating the referral code'})
      return
    }
    console.log('Generating code...')
    code = generateCode()
    console.log(code)
    let exists = await getCode(code)
    console.log('Exists')
    console.log(exists)
    if (!exists) {
      console.log('No existing code')
      break
    }
    counter++
  } while (true)
  let { surname } = req.body
  console.log('Inserting')
  let referral = await insertCode(code, surname)
  console.log('Got referral: ')
  console.log(referral)
  res.json(referral)
}