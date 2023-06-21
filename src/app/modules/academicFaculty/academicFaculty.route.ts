import express from 'express'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { academicFacultyController } from './academicFaculty.controller'
import { academicFacultyValidation } from './academicFaculty.zod.validation'

const router = express.Router()

router.post(
  '/create-faculty',
  validateZodRequest(academicFacultyValidation.createFacultyZodSchema),
  academicFacultyController.createFaculty
)

router.get('/:id', academicFacultyController.getSingleFaculty)

router.patch(
  '/:id',
  validateZodRequest(academicFacultyValidation.updatefacultyZodSchema),
  academicFacultyController.updateFaculty
)

router.delete('/:id', academicFacultyController.deleteFaculty)

router.get('/', academicFacultyController.getAllFaculties)

export const academicFacultyRoute = { router }
