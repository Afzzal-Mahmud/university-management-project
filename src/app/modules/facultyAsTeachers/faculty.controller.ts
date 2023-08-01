import { Request, Response } from 'express'
import { IFaculty } from './faculty.interface'
import { facultyFilterableFields } from './faculty.constant'
import { sendResponse } from '../../../shared/sendResponse'
import { pickRequest } from '../../../shared/pickRequest'
import { catchAsync } from '../../../shared/catchAsync'
import { paginationFields } from '../../../shared/constant/paginationField'
import { facultyServices } from './faculty.service.query'

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pickRequest(req.query, facultyFilterableFields)
  const paginationOptions = pickRequest(req.query, paginationFields)

  const result = await facultyServices.getAllFaculties(
    filters,
    paginationOptions
  )

  sendResponse<IFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculties fetched successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await facultyServices.getSingleFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty fetched successfully !',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await facultyServices.updateFaculty(id, updatedData)

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await facultyServices.deleteFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  })
})

export const facultyControllers = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
