import { SortOrder } from 'mongoose'
import ApiErrors from '../../../errors/ApiErrors'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions'
import { calculatePagination } from '../../../shared/helpers/paginationHelpers'
import { academicSemesterCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterCodeMapper[payload.title] !== payload.code) {
    throw new ApiErrors(
      400,
      "Invalid Semester Code it should be like '01' for 'Autumn', '02' for 'summer' and 03 for Fall semester"
    )
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseOnGet<IAcademicSemester[]>> => {
  const { page, limit, skipDoc, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skipDoc)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: { page, limit, total },
    data: result,
  }
}
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
}
