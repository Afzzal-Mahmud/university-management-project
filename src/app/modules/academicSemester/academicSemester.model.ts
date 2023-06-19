import { Schema, model } from 'mongoose'
import { academicSemesterMonths } from './academicSemester.constant'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'
import ApiErrors from '../../../errors/ApiErrors'

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
)

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isSemesterExist) {
    throw new ApiErrors(409, `${this.title} semester exist in ${this.year}`)
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
)
