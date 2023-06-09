import express from 'express'
import { userControllers } from './users.controller'
const router = express.Router()

router.post('/create-user', userControllers.createNewUser)

export const userRoutes = { router }
