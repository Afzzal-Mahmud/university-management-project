'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.calculatePagination = void 0
const calculatePagination = options => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit)
  const skipDoc = (page - 1) * limit
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'
  return {
    page,
    limit,
    skipDoc,
    sortBy,
    sortOrder,
  }
}
exports.calculatePagination = calculatePagination
