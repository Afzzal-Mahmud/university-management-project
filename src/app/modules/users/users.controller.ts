import { RequestHandler } from 'express'
import { userServices } from './users.services'

const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await userServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userControllers = {
  createNewUser,
}
