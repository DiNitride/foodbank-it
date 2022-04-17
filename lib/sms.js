export async function sendSms(number, message) {
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
}
