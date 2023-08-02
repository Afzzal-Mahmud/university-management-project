import { Request, Response } from 'express'
import { pickRequest } from '../../../shared/pickRequest'
import { IAdmin } from './admin.interface'
import { sendResponse } from '../../../shared/sendResponse'
import { catchAsync } from '../../../shared/catchAsync'
import { adminFilterableFields } from './admin.constant'
import { paginationFields } from '../../../shared/constant/paginationField'
import { adminServices } from './admin.service.query'

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await adminServices.getSingleAdmin(id)

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'A Admin fetched successfully !',
    data: result,
  })
})

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pickRequest(req.query, adminFilterableFields)
  const paginationOptions = pickRequest(req.query, paginationFields)

  const result = await adminServices.getAllAdmins(filters, paginationOptions)

  sendResponse<IAdmin[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Admins fetched successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await adminServices.updateAdmin(id, updatedData)

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await adminServices.deleteAdmin(id)

  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  })
})

export const adminControllers = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
}
