import { Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../facultyAsTeachers/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string
  role: string
  password: string
  needsPasswordChange: boolean
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId | IAdmin
}

export type IUserMethod = {
  isUserExist(id: string): Promise<Partial<IUser> | null>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}
