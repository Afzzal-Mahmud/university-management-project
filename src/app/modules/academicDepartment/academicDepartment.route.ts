import express from 'express'
import { academicDepartmentController } from './academicDepartment.controller'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { academicDepartmentValidation } from './academicDepartment.zod.validation'

const router = express.Router()

router.post(
  '/create-department',
  validateZodRequest(
    academicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  academicDepartmentController.createDepartment
)

router.get('/:id', academicDepartmentController.getSingleDepartment)

router.patch(
  '/:id',
  validateZodRequest(
    academicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  academicDepartmentController.updateDepartment
)

router.delete('/:id', academicDepartmentController.deleteDepartment)

router.get('/', academicDepartmentController.getAllDepartments)

export const academicDepartmentRoute = { router }
