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
exports.academicDepartmentController = void 0
const catchAsync_1 = require('../../../shared/catchAsync')
const sendResponse_1 = require('../../../shared/sendResponse')
const pickRequest_1 = require('../../../shared/pickRequest')
const paginationField_1 = require('../../../shared/constant/paginationField')
const academicDepartment_service_query_1 = require('./academicDepartment.service.query')
const createDepartment = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentData = __rest(req.body, [])
    const result =
      yield academicDepartment_service_query_1.academicDepartmentService.createDepartment(
        academicDepartmentData
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    })
  })
)
const getAllDepartments = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentFilterableFields = ['searchTerm', 'title']
    const filters = (0, pickRequest_1.pickRequest)(
      req.query,
      academicDepartmentFilterableFields
    )
    const paginationOptions = (0, pickRequest_1.pickRequest)(
      req.query,
      paginationField_1.paginationFields
    )
    const result =
      yield academicDepartment_service_query_1.academicDepartmentService.getAllDepartments(
        filters,
        paginationOptions
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'Academic departments fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  })
)
const getSingleDepartment = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params
    const result =
      yield academicDepartment_service_query_1.academicDepartmentService.getSingleDepartment(
        id
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department fetched successfully',
      data: result,
    })
  })
)
const updateDepartment = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params
    const result =
      yield academicDepartment_service_query_1.academicDepartmentService.updateDepartment(
        id,
        req.body
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    })
  })
)
const deleteDepartment = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params
    const result =
      yield academicDepartment_service_query_1.academicDepartmentService.deleteDepartment(
        id
      )
    ;(0, sendResponse_1.sendResponse)(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    })
  })
)
exports.academicDepartmentController = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
}
