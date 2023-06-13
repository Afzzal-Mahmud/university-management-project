import express from 'express'
import { userControllers } from './users.controller'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { userValidation } from './users.zod.validation.schema'
const router = express.Router()

router.post(
  '/create-user',
  validateZodRequest(userValidation.userZodSchema),
  userControllers.createNewUser
)

export const userRoutes = { router }
