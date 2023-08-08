import { User } from './users.model'
import { IUser } from './users.interface'
import config from '../../../config/index'
import ApiErrors from '../../../errors/ApiErrors'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IFaculty } from '../facultyAsTeachers/faculty.interface'
import { Faculty } from '../facultyAsTeachers/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

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
    await session.endSession()
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

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'faculty'
  /* the default password for user */
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  let newUserAllData = null
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    /* 1) auto genarated incrimental faculty id */
    const id = await generateFacultyId()
    user.id = id
    faculty.id = id

    const newfaculty = await Faculty.create([faculty], { session })
    if (!newfaculty.length) {
      throw new ApiErrors(400, 'Failed to create faculty')
    }
    // set faculty --> _id into user.faculty
    user.faculty = newfaculty[0]._id
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiErrors(400, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new ApiErrors(400, 'Roleback while create user and faculty')
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
    })
  }
  return newUserAllData
}

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'admin'
  /* the default password for user */
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  let newUserAllData = null
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    /* 1) auto genarated incrimental admin id */
    const id = await generateAdminId()
    user.id = id
    admin.id = id

    const newAdmin = await Admin.create([admin], { session })
    if (!newAdmin.length) {
      throw new ApiErrors(400, 'Failed to create Admin')
    }
    // set Admin --> _id into user.Admin
    user.admin = newAdmin[0]._id
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiErrors(400, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
    throw new ApiErrors(400, 'Roleback while createing Admin and User')
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id })
  }
  return newUserAllData
}

export const userServices = {
  createStudent,
  createFaculty,
  createAdmin,
}
