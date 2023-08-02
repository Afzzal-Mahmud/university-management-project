import express from 'express'
import { adminControllers } from './admin.controller'
const router = express.Router()

router.get('/:id', adminControllers.getSingleAdmin)

router.patch('/:id', adminControllers.updateAdmin)

router.delete('/:id', adminControllers.deleteAdmin)

router.get('/', adminControllers.getAllAdmins)

export const adminRoute = { router }
