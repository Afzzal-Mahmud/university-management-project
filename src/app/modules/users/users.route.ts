import express from 'express'
import { userControllers } from './users.controller'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { userValidation } from './users.zod.validation.schema'
const router = express.Router()

router.post(
  '/create-student',
  validateZodRequest(userValidation.userZodSchema),
  userControllers.createNewStudent
)

export const userRoutes = { router }
