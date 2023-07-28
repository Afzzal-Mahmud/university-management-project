'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.sendResponse = void 0
const sendResponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  }
  res.status(200).json(responseData)
}
exports.sendResponse = sendResponse
