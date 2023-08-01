"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyControllers = void 0;
const faculty_constant_1 = require("./faculty.constant");
const sendResponse_1 = require("../../../shared/sendResponse");
const pickRequest_1 = require("../../../shared/pickRequest");
const catchAsync_1 = require("../../../shared/catchAsync");
const paginationField_1 = require("../../../shared/constant/paginationField");
const faculty_service_query_1 = require("./faculty.service.query");
const getAllFaculties = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pickRequest_1.pickRequest)(req.query, faculty_constant_1.facultyFilterableFields);
    const paginationOptions = (0, pickRequest_1.pickRequest)(req.query, paginationField_1.paginationFields);
    const result = yield faculty_service_query_1.facultyServices.getAllFaculties(filters, paginationOptions);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculties fetched successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_query_1.facultyServices.getSingleFaculty(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty fetched successfully !',
        data: result,
    });
}));
const updateFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield faculty_service_query_1.facultyServices.updateFaculty(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty updated successfully !',
        data: result,
    });
}));
const deleteFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_query_1.facultyServices.deleteFaculty(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty deleted successfully !',
        data: result,
    });
}));
exports.facultyControllers = {
    getSingleFaculty,
    getAllFaculties,
    updateFaculty,
    deleteFaculty,
};
