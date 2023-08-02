import { Request, Response } from 'express'
import { pickRequest } from '../../../shared/pickRequest'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IManagementDepartment } from './managementDepartment.interface'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import { paginationFields } from '../../../shared/constant/paginationField'
import { managementDepartmentServices } from './managementDepartment.service.query'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body
  const result = await managementDepartmentServices.createDepartment(
    departmentData
  )

  sendResponse<IManagementDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Management department created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pickRequest(req.query, managementDepartmentFilterableFields)
  const paginationOptions = pickRequest(req.query, paginationFields)

  const result = await managementDepartmentServices.getAllDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Management departments fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await managementDepartmentServices.getSingleDepartment(id)

  sendResponse<IManagementDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Management department fetched successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedData = req.body
    const result = await managementDepartmentServices.updateDepartment(
      id,
      updatedData
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    })
  })
)

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await managementDepartmentServices.deleteDepartment(id)

  sendResponse<IManagementDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
  })
})

export const managementDepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
