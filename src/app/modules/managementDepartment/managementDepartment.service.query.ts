import { SortOrder } from 'mongoose'
import { ManagementDepartment } from './managementDepartment.model'
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IPaginationOptions } from '../../../interfaces/IPaginationOptions'
import { calculatePagination } from '../../../shared/helpers/paginationHelpers'
import { managementDepartmentSearchableFields } from './managementDepartment.constant'

const createDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload)
  return result
}

const getSingleDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id)
  return result
}

const getAllDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseOnGet<IManagementDepartment[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skipDoc, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skipDoc)
    .limit(limit)

  const total = await ManagementDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  return result
}

const deleteDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id)
  return result
}

export const managementDepartmentServices = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
