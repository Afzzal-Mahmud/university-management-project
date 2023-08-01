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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const faculty_model_1 = require("./faculty.model");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const paginationHelpers_1 = require("../../../shared/helpers/paginationHelpers");
const faculty_constant_1 = require("./faculty.constant");
const users_model_1 = require("../users/users.model");
const getSingleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findOne({ id })
        .populate('academicDepartment')
        .populate('academicFaculty');
    return result;
});
const getAllFaculties = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skipDoc, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePagination)(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: faculty_constant_1.facultySearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield faculty_model_1.Faculty.find(whereConditions)
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skipDoc)
        .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isFacultyExist = yield faculty_model_1.Faculty.findOne({ id });
    if (!isFacultyExist) {
        throw new ApiErrors_1.default(404, 'Faculty not found !');
    }
    const { name } = payload, facultyData = __rest(payload, ["name"]);
    if (payload.name) {
        for (const key in name) {
            if (Object.prototype.hasOwnProperty.call(name, key)) {
                isFacultyExist.name[key] = name[key];
            }
        }
    }
    Object.assign(isFacultyExist, facultyData);
    const result = yield faculty_model_1.Faculty.findOneAndUpdate({ id }, payload, {
        new: true,
    });
    return result;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the faculty is exist
    const isExist = yield faculty_model_1.Faculty.findOne({ id });
    if (!isExist) {
        throw new ApiErrors_1.default(404, 'Faculty not found !');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //delete faculty first
        const faculty = yield faculty_model_1.Faculty.findOneAndDelete({ id }, { session });
        if (!faculty) {
            throw new ApiErrors_1.default(404, 'Failed to delete student');
        }
        //delete user
        yield users_model_1.User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();
        return faculty;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.facultyServices = {
    getSingleFaculty,
    getAllFaculties,
    updateFaculty,
    deleteFaculty,
};
