import { SortOrder } from 'mongoose'
import ApiErrors from '../../../errors/ApiErrors'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions'
import { calculatePagination } from '../../../shared/helpers/paginationHelpers'
import { academicSemesterCodeMapper } from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
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
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseOnGet<IAcademicSemester[]>> => {
  const { page, limit, skipDoc, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters
  const semesterSearchTermsArray = ['title', 'code', 'year']
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: semesterSearchTermsArray.map(searchField => ({
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
  const result = await AcademicSemester.find(whenDataAvailable)
    .sort(sortCondition)
    .skip(skipDoc)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: { page, limit, total },
    data: result,
  }
}

const retriveSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSemesterInfo = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiErrors(
      400,
      "Invalid Semester Code it should be like '01' for 'Autumn', '02' for 'summer' and 03 for Fall semester"
    )
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
  retriveSingleSemester,
  updateSemesterInfo,
  deleteSemester,
}
