import mongoose, { SortOrder } from 'mongoose'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions'
import { IFaculty, IFacultyFilters, UserName } from './faculty.interface'
import { Faculty } from './faculty.model'
import ApiErrors from '../../../errors/ApiErrors'
import { calculatePagination } from '../../../shared/helpers/paginationHelpers'
import { facultySearchableFields } from './faculty.constant'
import { User } from '../users/users.model'

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseOnGet<IFaculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skipDoc, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skipDoc)
    .limit(limit)

  const total = await Faculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isFacultyExist = await Faculty.findOne({ id })

  if (!isFacultyExist) {
    throw new ApiErrors(404, 'Faculty not found !')
  }

  const {
    name,

    ...facultyData
  } = payload

  if (payload.name) {
    for (const key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) {
        isFacultyExist.name[key as keyof UserName] = name[key as keyof UserName]
      }
    }
  }

  Object.assign(isFacultyExist, facultyData)

  const result = await Faculty.findOneAndUpdate({ id }, payload, {
    new: true,
  })
  return result
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new ApiErrors(404, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session })
    if (!faculty) {
      throw new ApiErrors(404, 'Failed to delete student')
    }
    //delete user
    await User.deleteOne({ id })
    session.commitTransaction()
    session.endSession()

    return faculty
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

export const facultyServices = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
