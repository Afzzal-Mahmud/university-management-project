import { Request, Response } from 'express'
import { userServices } from './users.services'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IUser } from './users.interface'

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body
  const result = await userServices.createUser(user)

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  })
})

export const userControllers = {
  createNewUser,
}
