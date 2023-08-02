import { Model, model } from 'mongoose'
import { IManagementDepartment } from './managementDepartment.interface'
import { Schema } from 'mongoose'

type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>

const ManagementDepartmentSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema)
