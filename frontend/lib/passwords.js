import argon2 from 'argon2'

async function hash(plaintext) {
  let hashed = await argon2.hash(plaintext)
  return hashed
}

async function verify(hash, password) {
  return await argon2.verify(hash, password)
}

export { hash, verify }