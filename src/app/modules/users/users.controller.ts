import { Request, Response } from 'express'
import { userServices } from './users.services'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IUser } from './users.interface'

const createNewStudent = catchAsync(async (req: Request, res: Response) => {
  // userData represents password field and student represents a student's personal info such as name,address,and so on
  const { student, ...userData } = req.body
  const result = await userServices.createStudent(student, userData)

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body
  const result = await userServices.createFaculty(faculty, userData)

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty created successfully!',
    data: result,
  })
})

export const userControllers = {
  createNewStudent,
  createFaculty,
}
