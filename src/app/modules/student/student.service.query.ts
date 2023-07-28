/* eslint-disable no-undefined */
import { SortOrder } from 'mongoose'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions'
import { calculatePagination } from '../../../shared/helpers/paginationHelpers'
import { Student } from './student.model'
import {
  Guardian,
  IStudent,
  IStudentFilters,
  LocalGuardian,
  UserName,
} from './student.interface'
import ApiErrors from '../../../errors/ApiErrors'

const retriveAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseOnGet<IStudent[]>> => {
  const { page, limit, skipDoc, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters
  const studentSearchTermsArray = [
    'id',
    'firstName',
    'middleName',
    'lastName',
    'email',
    'contactNo',
  ]
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchTermsArray.map(searchField => ({
        [searchField]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // whenDataAvailable actually check if user gives us empty search field it resolve it .

  const whenDataAvailable =
    andCondition.length > 0 ? { $and: andCondition } : {}

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await Student.find(whenDataAvailable)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skipDoc)
    .limit(limit)
  const total = await Student.countDocuments(whenDataAvailable)

  return {
    meta: { page, limit, total },
    data: result,
  }
}

const retriveSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

const updateStudentInfo = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isStudentExist = await Student.findOne({ id })
  if (!isStudentExist) {
    throw new ApiErrors(404, 'Student not found')
  }

  const {
    name,
    guardian,
    localGuardian,
    academicFaculty,
    academicDepartment,
    academicSemester,
    ...studentData
  } = payload

  if (payload.name) {
    for (const key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) {
        isStudentExist.name[key as keyof UserName] = name[key as keyof UserName]
      }
    }
  }

  if (payload.guardian) {
    for (const key in guardian) {
      if (Object.prototype.hasOwnProperty.call(guardian, key)) {
        isStudentExist.guardian[key as keyof Guardian] =
          guardian[key as keyof Guardian]
      }
    }
  }

  if (payload.localGuardian) {
    for (const key in localGuardian) {
      if (Object.prototype.hasOwnProperty.call(localGuardian, key)) {
        isStudentExist.localGuardian[key as keyof LocalGuardian] =
          localGuardian[key as keyof LocalGuardian]
      }
    }
  }

  if (academicFaculty !== undefined) {
    isStudentExist.academicFaculty = academicFaculty
  }
  if (academicDepartment !== undefined) {
    isStudentExist.academicDepartment = academicDepartment
  }
  if (academicSemester !== undefined) {
    isStudentExist.academicSemester = academicSemester
  }

  Object.assign(isStudentExist, studentData)

  const result = await Student.findOneAndUpdate({ id }, payload, {
    new: true,
  })
  return result
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}
export const studentServices = {
  retriveAllStudents,
  retriveSingleStudent,
  updateStudentInfo,
  deleteStudent,
}
