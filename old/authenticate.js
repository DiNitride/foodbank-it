import cookie from 'cookie'

// https://www.youtube.com/watch?v=w8n7Soz7khw
export default function Authenticate(req, res) {
  res.setHeader("Set-Cookie", cookie.serialize('token', 'James', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60,
    sameSite: 'strict',
    path: '/'
  }))
  res.statusCode = 200
  res.json({ success: true })
}
