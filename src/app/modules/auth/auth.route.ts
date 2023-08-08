import express from 'express'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { authValidation } from './auth.zod.validation'
import { authControllers } from './auth.controller'

const router = express.Router()

router.post(
  '/login',
  validateZodRequest(authValidation.loginZodSchema),
  authControllers.loginUser
)

router.post(
  '/refresh-token',
  validateZodRequest(authValidation.refreshTokenZodSchema),
  authControllers.refreshToken
)

export const authRoutes = { router }
