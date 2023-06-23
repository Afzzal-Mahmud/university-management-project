import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './users.model'

export async function generateStudentId(
  academicSemester: IAcademicSemester
): Promise<string> {
  // Retrieve the last created user from the database
  const lastStudentId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ id: -1 })
    .lean()

  // Determine the current highest user ID
  const highestId = lastStudentId ? parseInt(lastStudentId.id.slice(6)) : 0

  // Increment the highest user ID by 1 and format as 5-digit string with leading zeroes and also addint prefix before year as Y and which intake such as summer, auttum, fall as I
  let nextId = (highestId + 1).toString().padStart(5, '0')

  nextId = `Y${academicSemester.year.substring(2)}I${
    academicSemester.code
  }${nextId}`

  const studentId = nextId

  return studentId
}
