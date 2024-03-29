import express from 'express'
import { userRoutes } from '../modules/users/users.route'
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'
import { studentRoutes } from '../modules/student/student.route'

const routers = express.Router()

const moduleRoute = [
  {
    path: '/users/',
    route: userRoutes.router,
  },
  {
    path: '/create-semesters/',
    route: academicSemesterRoute.router,
  },
  {
    path: '/academic-faculty/',
    route: academicFacultyRoute.router,
  },
  {
    path: '/academic-department/',
    route: academicDepartmentRoute.router,
  },
  {
    path: '/student/',
    route: studentRoutes.router,
  },
]

moduleRoute.forEach(eachRoute => routers.use(eachRoute.path, eachRoute.route))

export const mainRoutes = { routers }
