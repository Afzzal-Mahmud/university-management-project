'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.studentController = void 0
const catchAsync_1 = require('../../../shared/catchAsync')
const sendResponse_1 = require('../../../shared/sendResponse')
const pickRequest_1 = require('../../../shared/pickRequest')
const student_service_query_1 = require('./student.service.query')
const getAllStudents = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = yield (0, pickRequest_1.pickRequest)(req.query, [
      'searchTerm',
      'id',
      'email',
      'contactNo',
    ])
    const paginationKeyArray = ['page', 'limit', 'sortBy', 'sortOrder']
    const paginationOptions = (0, pickRequest_1.pickRequest)(
      req.query,
      paginationKeyArray
    )
    const result =
      yield student_service_query_1.studentServices.retriveAllStudents(
        filters,
        paginationOptions
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'students retrive successfully',
      meta: result.meta,
      data: result.data,
    })
  })
)
const getSingleStudent = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result =
      yield student_service_query_1.studentServices.retriveSingleStudent(id)
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'A single student retrive successfully',
      data: result,
    })
  })
)
const updateStudent = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const updatedData = req.body
    const result =
      yield student_service_query_1.studentServices.updateStudentInfo(
        id,
        updatedData
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'student updated successfully',
      data: result,
    })
  })
)
const deleteStudent = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield student_service_query_1.studentServices.deleteStudent(
      id
    )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'student deleted successfully',
      data: result,
    })
  })
)
exports.studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
