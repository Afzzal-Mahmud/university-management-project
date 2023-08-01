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
exports.studentServices = void 0;
const paginationHelpers_1 = require("../../../shared/helpers/paginationHelpers");
const student_model_1 = require("./student.model");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const retriveAllStudents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skipDoc, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePagination)(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    console.log(searchTerm);
    const studentSearchTermsArray = [
        'id',
        'name.firstName',
        'name.middleName',
        'name.lastName',
        'email',
        'contactNo',
    ];
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: studentSearchTermsArray.map(searchField => ({
                [searchField]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // whenDataAvailable actually check if user gives us empty search field it resolve it .
    const whenDataAvailable = andCondition.length > 0 ? { $and: andCondition } : {};
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield student_model_1.Student.find(whenDataAvailable)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortCondition)
        .skip(skipDoc)
        .limit(limit);
    const total = yield student_model_1.Student.countDocuments(whenDataAvailable);
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const retriveSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
    return result;
});
const updateStudentInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isStudentExist = yield student_model_1.Student.findOne({ id });
    if (!isStudentExist) {
        throw new ApiErrors_1.default(404, 'Student not found');
    }
    const { name, guardian, localGuardian, academicFaculty, academicDepartment, academicSemester } = payload, studentData = __rest(payload, ["name", "guardian", "localGuardian", "academicFaculty", "academicDepartment", "academicSemester"]);
    if (payload.name) {
        for (const key in name) {
            if (Object.prototype.hasOwnProperty.call(name, key)) {
                isStudentExist.name[key] = name[key];
            }
        }
    }
    if (payload.guardian) {
        for (const key in guardian) {
            if (Object.prototype.hasOwnProperty.call(guardian, key)) {
                isStudentExist.guardian[key] =
                    guardian[key];
            }
        }
    }
    if (payload.localGuardian) {
        for (const key in localGuardian) {
            if (Object.prototype.hasOwnProperty.call(localGuardian, key)) {
                isStudentExist.localGuardian[key] =
                    localGuardian[key];
            }
        }
    }
    if (academicFaculty !== undefined) {
        isStudentExist.academicFaculty = academicFaculty;
    }
    if (academicDepartment !== undefined) {
        isStudentExist.academicDepartment = academicDepartment;
    }
    if (academicSemester !== undefined) {
        isStudentExist.academicSemester = academicSemester;
    }
    Object.assign(isStudentExist, studentData);
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, payload, {
        new: true,
    });
    return result;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findByIdAndDelete(id)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty');
    return result;
});
exports.studentServices = {
    retriveAllStudents,
    retriveSingleStudent,
    updateStudentInfo,
    deleteStudent,
};
