import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'

import { pickRequest } from '../../../shared/pickRequest'
import { IStudent } from './student.interface'
import { studentServices } from './student.service.query'

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = await pickRequest(req.query, [
    'searchTerm',
    'id',
    'email',
    'contactNo',
  ])

  const paginationKeyArray: string[] = ['page', 'limit', 'sortBy', 'sortOrder']
  const paginationOptions = pickRequest(req.query, paginationKeyArray)

  const result = await studentServices.retriveAllStudents(
    filters,
    paginationOptions
  )

  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'students retrive successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await studentServices.retriveSingleStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'A single student retrive successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await studentServices.updateStudentInfo(id, updatedData)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'student updated successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await studentServices.deleteStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'student deleted successfully',
    data: result,
  })
})

export const studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
