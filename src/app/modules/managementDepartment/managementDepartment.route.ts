import express from 'express'
import { managementDepartmentControllers } from './managementDepartment.controller'

const router = express.Router()

router.post(
  '/create-department',
  managementDepartmentControllers.createDepartment
)

router.get('/:id', managementDepartmentControllers.getSingleDepartment)

router.patch('/:id', managementDepartmentControllers.updateDepartment)

router.delete('/:id', managementDepartmentControllers.deleteDepartment)

router.get('/', managementDepartmentControllers.getAllDepartments)

export const ManagementDepartmentRoutes = { router }
