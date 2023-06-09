import { User } from './users.model'
import { IUser } from './users.interface'
import config from '../../../config/index'
import { generateUserId } from './users.utils'
import ApiErrors from '../../../errors/ApiErrors'

const createUser = async (user: IUser): Promise<IUser | null> => {
  /* 1) auto genarated incrimental id */

  const id = await generateUserId()
  user.id = id

  /* and 2) the default password for student */

  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createdUser = await User.create(user)
  if (!createUser) {
    throw new ApiErrors(400, 'Failed to create user')
  }

  return createdUser
}

export const userServices = {
  createUser,
}
