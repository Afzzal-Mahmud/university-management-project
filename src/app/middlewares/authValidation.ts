import { NextFunction, Request, Response } from 'express'
import ApiErrors from '../../errors/ApiErrors'
import { verifyJsonWebToken } from '../../shared/helpers/verifyToken'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // take the token
      const userToken = req.headers.authorization
      if (!userToken) {
        throw new ApiErrors(401, 'Invalid token or Unauthorized')
      }
      //   verify token
      const verifiedUser = verifyJsonWebToken(
        userToken,
        config.jwt.secret as Secret
      )
      if (!verifiedUser) {
        throw new ApiErrors(401, 'Unauthorized user')
      }
      req.user = verifiedUser
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiErrors(403, 'Forbidden')
      }
      return next()
    } catch (error) {
      next(error)
    }
  }
