'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.mainRoutes = void 0
const express_1 = __importDefault(require('express'))
const users_route_1 = require('../modules/users/users.route')
const academicSemester_route_1 = require('../modules/academicSemester/academicSemester.route')
const academicFaculty_route_1 = require('../modules/academicFaculty/academicFaculty.route')
const academicDepartment_route_1 = require('../modules/academicDepartment/academicDepartment.route')
const student_route_1 = require('../modules/student/student.route')
const routers = express_1.default.Router()
const moduleRoute = [
  {
    path: '/users/',
    route: users_route_1.userRoutes.router,
  },
  {
    path: '/create-semesters/',
    route: academicSemester_route_1.academicSemesterRoute.router,
  },
  {
    path: '/academic-faculty/',
    route: academicFaculty_route_1.academicFacultyRoute.router,
  },
  {
    path: '/academic-department/',
    route: academicDepartment_route_1.academicDepartmentRoute.router,
  },
  {
    path: '/student/',
    route: student_route_1.studentRoutes.router,
  },
]
moduleRoute.forEach(eachRoute => routers.use(eachRoute.path, eachRoute.route))
exports.mainRoutes = { routers }
