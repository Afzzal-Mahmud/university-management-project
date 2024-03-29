import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './users.model'

export async function generateStudentId(
  academicSemester: IAcademicSemester
): Promise<string> {
  // Retrieve the last created user from the database
  const lastStudentId = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
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

export async function generateFacultyId(): Promise<string> {
  // Retrieve the last created user from the database
  const lastFacultyId = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 }
  )
    .sort({ id: -1 })
    .lean()

  // Determine the current highest user ID
  const highestFacultyId = lastFacultyId
    ? parseInt(lastFacultyId.id.slice(1))
    : 0

  // Increment the highest faculty ID by 1 and format as 5-digit string with leading zeroes and also additonal prefix for faculty
  let nextFacultyId = (highestFacultyId + 1).toString().padStart(5, '0')

  nextFacultyId = `F${nextFacultyId}`

  const facultyId = nextFacultyId

  return facultyId
}
