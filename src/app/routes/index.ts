import express from 'express'
import { userRoutes } from '../modules/users/users.route'
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'
import { studentRoutes } from '../modules/student/student.route'
import { facultyRoutes } from '../modules/facultyAsTeachers/faculty.route'

import { adminRoute } from '../modules/admin/admin.route'
import { authRoutes } from '../modules/auth/auth.route'
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route'

const routers = express.Router()

const moduleRoute = [
  {
    path: '/users/',
    route: userRoutes.router,
  },
  {
    path: '/academic-semesters/',
    route: academicSemesterRoute.router,
  },
  {
    path: '/academic-facultys/',
    route: academicFacultyRoute.router,
  },
  {
    path: '/academic-departments/',
    route: academicDepartmentRoute.router,
  },
  {
    path: '/students/',
    route: studentRoutes.router,
  },
  {
    path: '/faculties/',
    route: facultyRoutes.router,
  },
  {
    path: '/admins/',
    route: adminRoute.router,
  },
  {
    path: '/auth/',
    route: authRoutes.router,
  },
  {
    path: '/management-departments/',
    route: ManagementDepartmentRoutes.router,
  },
]

moduleRoute.forEach(eachRoute => routers.use(eachRoute.path, eachRoute.route))

export const mainRoutes = { routers }
