import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service.query'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    )
    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const academicSemesterControllers = {
  createSemester,
}
