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
router.patch(
  '/:id',
  validateZodRequest(
    academicSemesterValidation.updateAcademicSemesterZodSchema
  ),
  academicSemesterControllers.updateSemester
)
router.delete('/:id', academicSemesterControllers.deleteSemester)
router.get('/:id', academicSemesterControllers.getSingleSemester)
router.get('/', academicSemesterControllers.getSemesters)

export const academicSemesterRoute = { router }
