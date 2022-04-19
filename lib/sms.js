import { FetchError } from 'node-fetch'

export async function sendSms(number, message) {
  try {
    await fetch(`${process.env.MOCK_SMS_URL}/api/send`, {
      method: 'POST',
      body: JSON.stringify({
        number: number,
        message: message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (e) {
    if (e instanceof FetchError) {
      console.warn(`WARN: SMS Service Unavailable, message to ${number} not delivered.`)
    }
  }
}
