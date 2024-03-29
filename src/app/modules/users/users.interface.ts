import { Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../facultyAsTeachers/faculty.interface'

export type IUser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  // admin?: Types.ObjectId | IAdmin
}
