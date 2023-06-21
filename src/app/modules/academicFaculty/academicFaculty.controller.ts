import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { pickRequest } from '../../../shared/pickRequest'
import { paginationFields } from '../../../shared/constant/paginationField'
import { academicFacultyService } from './academicFaculty.service.query'
import { IAcademicFaculty } from './academicFaculty.interface'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result = await academicFacultyService.createFaculty(academicFacultyData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const academicFacultyFilterableFields = ['searchTerm', 'title']
  const filters = pickRequest(req.query, academicFacultyFilterableFields)
  const paginationOptions = pickRequest(req.query, paginationFields)

  const result = await academicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicFacultyService.getSingleFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedData = req.body
    const result = await academicFacultyService.updateFaculty(id, updatedData)

    sendResponse<IAcademicFaculty>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    })
  })
)

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicFacultyService.deleteByIdFromDB(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  })
})

export const academicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
