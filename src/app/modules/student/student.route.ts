import express from 'express'
import { studentController } from './student.controller'
import { studentValidation } from './student.zod.validation'
import validateZodRequest from '../../middlewares/validateZodRequest'
const router = express.Router()

router.get('/:id', studentController.getSingleStudent)
router.delete('/:id', studentController.deleteStudent)
router.patch(
  '/:id',
  validateZodRequest(studentValidation.updateStudentZodSchema),
  studentController.updateStudent
)
router.get('/', studentController.getAllStudents)

export const studentRoutes = { router }
