import { User } from './users.model'
import { IUser } from './users.interface'
import config from '../../../config/index'
import ApiErrors from '../../../errors/ApiErrors'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { generateStudentId } from './users.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  /* 1) auto genarated incrimental id */

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  user.role = 'student'
  /* the default password for student */
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  let newUserAllData = null
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester as IAcademicSemester)
    user.id = id
    student.id = id

    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiErrors(400, 'Failed to create student')
    }
    // set student --> _id into user.student
    user.student = newStudent[0]._id
    // console.log(user)
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiErrors(400, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession
    throw new ApiErrors(400, 'roleback while create user and student')
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    })
  }
  return newUserAllData
}

export const userServices = {
  createStudent,
}
