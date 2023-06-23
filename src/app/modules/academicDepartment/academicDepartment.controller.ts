import { Request, Response } from 'express'

import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { pickRequest } from '../../../shared/pickRequest'
import { IAcademicDepartment } from './academicDepartment.interface'
import { paginationFields } from '../../../shared/constant/paginationField'
import { academicDepartmentService } from './academicDepartment.service.query'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await academicDepartmentService.createDepartment(
    academicDepartmentData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const academicDepartmentFilterableFields = ['searchTerm', 'title']
  const filters = pickRequest(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pickRequest(req.query, paginationFields)

  const result = await academicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicDepartmentService.updateDepartment(id, req.body)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicDepartmentService.deleteDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  })
})

export const academicDepartmentController = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
}
