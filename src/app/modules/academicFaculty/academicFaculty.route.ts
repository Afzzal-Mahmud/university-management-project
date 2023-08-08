import express from 'express'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { academicFacultyController } from './academicFaculty.controller'
import { academicFacultyValidation } from './academicFaculty.zod.validation'
import { ENUMS_USER_ROLE } from '../../../enums/user.role'
import { auth } from '../../middlewares/authValidation'

const router = express.Router()

router.post(
  '/create-faculty',
  validateZodRequest(academicFacultyValidation.createFacultyZodSchema),
  auth(ENUMS_USER_ROLE.ADMIN, ENUMS_USER_ROLE.SUPER_ADMIN),
  academicFacultyController.createFaculty
)

router.get(
  '/:id',
  auth(
    ENUMS_USER_ROLE.ADMIN,
    ENUMS_USER_ROLE.FACULTY,
    ENUMS_USER_ROLE.STUDENT,
    ENUMS_USER_ROLE.SUPER_ADMIN
  ),
  academicFacultyController.getSingleFaculty
)

router.patch(
  '/:id',
  validateZodRequest(academicFacultyValidation.updatefacultyZodSchema),
  auth(ENUMS_USER_ROLE.ADMIN, ENUMS_USER_ROLE.FACULTY),
  academicFacultyController.updateFaculty
)

router.delete(
  '/:id',
  auth(ENUMS_USER_ROLE.ADMIN),
  academicFacultyController.deleteFaculty
)

router.get(
  '/',
  auth(
    ENUMS_USER_ROLE.ADMIN,
    ENUMS_USER_ROLE.FACULTY,
    ENUMS_USER_ROLE.STUDENT,
    ENUMS_USER_ROLE.SUPER_ADMIN
  ),
  academicFacultyController.getAllFaculties
)

export const academicFacultyRoute = { router }
