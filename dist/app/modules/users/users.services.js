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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const users_model_1 = require("./users.model");
const index_1 = __importDefault(require("../../../config/index"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const users_utils_1 = require("./users.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../student/student.model");
const faculty_model_1 = require("../facultyAsTeachers/faculty.model");
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    /* 1) auto genarated incrimental id */
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(student.academicSemester);
    user.role = 'student';
    /* the default password for student */
    if (!user.password) {
        user.password = index_1.default.default_user_pass;
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, users_utils_1.generateStudentId)(academicSemester);
        user.id = id;
        student.id = id;
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiErrors_1.default(400, 'Failed to create student');
        }
        // set student --> _id into user.student
        user.student = newStudent[0]._id;
        // console.log(user)
        const newUser = yield users_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(400, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new ApiErrors_1.default(400, 'roleback while create user and student');
    }
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
            populate: [
                { path: 'academicSemester' },
                { path: 'academicDepartment' },
                { path: 'academicFaculty' },
            ],
        });
    }
    return newUserAllData;
});
const createFaculty = (faculty, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = 'faculty';
    /* the default password for user */
    if (!user.password) {
        user.password = index_1.default.default_user_pass;
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        /* 1) auto genarated incrimental faculty id */
        const id = yield (0, users_utils_1.generateFacultyId)();
        user.id = id;
        faculty.id = id;
        const newfaculty = yield faculty_model_1.Faculty.create([faculty], { session });
        if (!newfaculty.length) {
            throw new ApiErrors_1.default(400, 'Failed to create faculty');
        }
        // set faculty --> _id into user.faculty
        user.faculty = newfaculty[0]._id;
        // console.log(user)
        const newUser = yield users_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(400, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new ApiErrors_1.default(400, 'Roleback while create user and faculty');
    }
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'faculty',
            populate: [
                { path: 'academicSemester' },
                { path: 'academicDepartment' },
                { path: 'academicFaculty' },
            ],
        });
    }
    return newUserAllData;
});
exports.userServices = {
    createStudent,
    createFaculty,
};
