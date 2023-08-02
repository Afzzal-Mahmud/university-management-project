/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { adminSearchableFields } from './admin.constant'
import { IAdmin, IAdminFilters, UserName } from './admin.interface'
import { Admin } from './admin.model'
import ApiErrors from '../../../errors/ApiErrors'
import { User } from '../users/users.model'
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { calculatePagination } from '../../../shared/helpers/paginationHelpers'

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('managementDepartment')
  return result
}

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseOnGet<IAdmin[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skipDoc, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skipDoc)
    .limit(limit)

  const total = await Admin.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isAdminExist = await Admin.findOne({ id })

  if (!isAdminExist) {
    throw new ApiErrors(404, 'Admin not found !')
  }

  const { name, ...adminData } = payload

  if (payload.name) {
    for (const key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) {
        isAdminExist.name[key as keyof UserName] = name[key as keyof UserName]
      }
    }
  }

  Object.assign(isAdminExist, adminData)

  const result = await Admin.findOneAndUpdate({ id }, payload, {
    new: true,
  })
  return result
}

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  // check if the faculty is exist
  const isExist = await Admin.findOne({ id })

  if (!isExist) {
    throw new ApiErrors(404, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //delete student first
    const admin = await Admin.findOneAndDelete({ id }, { session })
    if (!admin) {
      throw new ApiErrors(404, 'Failed to delete admin')
    }
    //delete user
    await User.deleteOne({ id })
    session.commitTransaction()
    session.endSession()

    return admin
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

export const adminServices = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
}
