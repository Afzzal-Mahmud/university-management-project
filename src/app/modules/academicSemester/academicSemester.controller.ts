import { Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service.query'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'

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

export const academicSemesterControllers = {
  createSemester,
}
