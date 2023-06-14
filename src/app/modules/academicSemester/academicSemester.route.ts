import express from 'express'
// import { userControllers } from './users.controller'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { academicSemesterValidation } from './academicSemester.zod.validation'
import { academicSemesterControllers } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/academic-semester',
  validateZodRequest(academicSemesterValidation.academicSemesterZodSchema),
  academicSemesterControllers.createSemester
)

export const academicSemesterRoute = { router }
