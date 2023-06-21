import { Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service.query'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { pickRequest } from '../../../shared/pickRequest'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createAcademicSemester(
    academicSemesterData
  )

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Aademic semester created successfully!',
    data: result,
  })
})

const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = await pickRequest(req.query, [
    'searchTerm',
    'title',
    'code',
    'year',
  ])

  const paginationKeyArray: string[] = ['page', 'limit', 'sortBy', 'sortOrder']
  const paginationOptions = pickRequest(req.query, paginationKeyArray)

  const result = await AcademicSemesterService.getAllSemesters(
    filters as IAcademicSemesterFilters,
    paginationOptions
  )

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Semester retrive successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.retriveSingleSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'A single semester retrive successfully',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicSemesterService.updateSemesterInfo(
    id,
    updatedData
  )
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'semester updated successfully',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'semester deleted successfully',
    data: result,
  })
})

export const academicSemesterControllers = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
