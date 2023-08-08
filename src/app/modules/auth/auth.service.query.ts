import { Secret } from 'jsonwebtoken'
import ApiErrors from '../../../errors/ApiErrors'
import { User } from '../users/users.model'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.inferface'
import config from '../../../config'
import { createJsonWebToken } from '../../../shared/helpers/createToken'
import { verifyJsonWebToken } from '../../../shared/helpers/verifyToken'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  /* creating a instance of user model */
  const user = new User()

  const isUserExist = await user.isUserExist(id)
  if (!isUserExist) {
    throw new ApiErrors(404, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiErrors(400, 'Password is incorrect')
  }

  // user object-data for token genaration
  const userData = {
    id: isUserExist.id,
    role: isUserExist.role,
  }
  const needsPasswordChange = isUserExist.needsPasswordChange as boolean

  const accessToken = createJsonWebToken(
    userData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  // refresh token
  const refreshToken = createJsonWebToken(
    userData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  try {
    // Verify token
    const verifiedToken = verifyJsonWebToken(
      token,
      config.jwt.refresh_secret as Secret
    )

    const { id } = verifiedToken

    // Check if the user exists
    const user = new User()
    const isUserExist = await user.isUserExist(id)
    if (!isUserExist) {
      throw new ApiErrors(404, 'User not found')
    }

    // Generate new token
    const newAccessToken = createJsonWebToken(
      { id: isUserExist.id, role: isUserExist.role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    )

    return { accessToken: newAccessToken }
  } catch (err) {
    throw new ApiErrors(403, 'Invalid Refresh Token')
  }
}

export const authServices = { loginUser, refreshToken }
