import ApiErrors from '../../../errors/ApiErrors'
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

export const AcademicSemesterService = {
  createAcademicSemester,
}
