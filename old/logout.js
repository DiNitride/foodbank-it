import cookie from 'cookie'

// https://www.youtube.com/watch?v=w8n7Soz7khw
export default function Authenticate(req, res) {
  res.setHeader("Set-Cookie", cookie.serialize('token', "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    sameSite: 'strict',
    path: '/'
  }))
  res.statusCode = 200
  res.json({ success: true })
}
