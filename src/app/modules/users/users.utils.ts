import { User } from './users.model'

export async function generateUserId(): Promise<string> {
  // Retrieve the last created user from the database
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ id: -1 })
    .lean()

  // Determine the current highest user ID
  const highestId = lastUserId ? parseInt(lastUserId.id.slice(2)) : 0

  // Increment the highest user ID by 1 and format as 5-digit string with leading zeroes
  const nextId = (highestId + 1).toString().padStart(5, '0')

  // Generate the final user ID with the "UW" prefix
  const userId = `UW${nextId}`

  return userId
}
