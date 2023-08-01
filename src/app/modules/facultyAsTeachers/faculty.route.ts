import express from 'express'
import { facultyControllers } from './faculty.controller'

const router = express.Router()

router.get('/:id', facultyControllers.getSingleFaculty)

router.patch('/:id', facultyControllers.updateFaculty)

router.delete('/:id', facultyControllers.deleteFaculty)

router.get('/', facultyControllers.getAllFaculties)

export const facultyRoutes = { router }
