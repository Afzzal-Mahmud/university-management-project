import express from 'express'
import { userRoutes } from '../modules/users/users.route'
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route'

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
]

moduleRoute.forEach(eachRoute => routers.use(eachRoute.path, eachRoute.route))

export const mainRoutes = { routers }
