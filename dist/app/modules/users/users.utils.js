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
exports.generateFacultyId = exports.generateStudentId = void 0;
const users_model_1 = require("./users.model");
function generateStudentId(academicSemester) {
    return __awaiter(this, void 0, void 0, function* () {
        // Retrieve the last created user from the database
        const lastStudentId = yield users_model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
            .sort({ id: -1 })
            .lean();
        // Determine the current highest user ID
        const highestId = lastStudentId ? parseInt(lastStudentId.id.slice(6)) : 0;
        // Increment the highest user ID by 1 and format as 5-digit string with leading zeroes and also addint prefix before year as Y and which intake such as summer, auttum, fall as I
        let nextId = (highestId + 1).toString().padStart(5, '0');
        nextId = `Y${academicSemester.year.substring(2)}I${academicSemester.code}${nextId}`;
        const studentId = nextId;
        return studentId;
    });
}
exports.generateStudentId = generateStudentId;
function generateFacultyId() {
    return __awaiter(this, void 0, void 0, function* () {
        // Retrieve the last created user from the database
        const lastFacultyId = yield users_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
            .sort({ id: -1 })
            .lean();
        // Determine the current highest user ID
        const highestFacultyId = lastFacultyId
            ? parseInt(lastFacultyId.id.slice(1))
            : 0;
        // Increment the highest faculty ID by 1 and format as 5-digit string with leading zeroes and also additonal prefix for faculty
        let nextFacultyId = (highestFacultyId + 1).toString().padStart(5, '0');
        nextFacultyId = `F${nextFacultyId}`;
        const facultyId = nextFacultyId;
        return facultyId;
    });
}
exports.generateFacultyId = generateFacultyId;
