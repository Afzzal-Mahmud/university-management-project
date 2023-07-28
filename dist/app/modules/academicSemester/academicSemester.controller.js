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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.academicSemesterControllers = void 0
const academicSemester_service_query_1 = require('./academicSemester.service.query')
const catchAsync_1 = require('../../../shared/catchAsync')
const sendResponse_1 = require('../../../shared/sendResponse')
const pickRequest_1 = require('../../../shared/pickRequest')
const createSemester = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterData = __rest(req.body, [])
    const result =
      yield academicSemester_service_query_1.AcademicSemesterService.createAcademicSemester(
        academicSemesterData
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'Aademic semester created successfully!',
      data: result,
    })
  })
)
const getSemesters = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = yield (0, pickRequest_1.pickRequest)(req.query, [
      'searchTerm',
      'title',
      'code',
      'year',
    ])
    const paginationKeyArray = ['page', 'limit', 'sortBy', 'sortOrder']
    const paginationOptions = (0, pickRequest_1.pickRequest)(
      req.query,
      paginationKeyArray
    )
    const result =
      yield academicSemester_service_query_1.AcademicSemesterService.getAllSemesters(
        filters,
        paginationOptions
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'Semester retrive successfully',
      meta: result.meta,
      data: result.data,
    })
  })
)
const getSingleSemester = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result =
      yield academicSemester_service_query_1.AcademicSemesterService.retriveSingleSemester(
        id
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'A single semester retrive successfully',
      data: result,
    })
  })
)
const updateSemester = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const updatedData = req.body
    const result =
      yield academicSemester_service_query_1.AcademicSemesterService.updateSemesterInfo(
        id,
        updatedData
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'semester updated successfully',
      data: result,
    })
  })
)
const deleteSemester = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result =
      yield academicSemester_service_query_1.AcademicSemesterService.deleteSemester(
        id
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'semester deleted successfully',
      data: result,
    })
  })
)
exports.academicSemesterControllers = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
