import { Request, Response } from 'express'
import usersServices from './users.services'

const createNewUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: true,
      message: `Faield to create user ${error}`,
    })
  }
}
export default {
  createNewUser,
}
