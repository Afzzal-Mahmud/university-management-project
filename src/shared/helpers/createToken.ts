import jwt, { Secret } from 'jsonwebtoken'

export const createJsonWebToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}
