"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const student_zod_validation_1 = require("./student.zod.validation");
const validateZodRequest_1 = __importDefault(require("../../middlewares/validateZodRequest"));
const router = express_1.default.Router();
router.get('/:id', student_controller_1.studentController.getSingleStudent);
router.delete('/:id', student_controller_1.studentController.deleteStudent);
router.patch('/:id', (0, validateZodRequest_1.default)(student_zod_validation_1.studentValidation.updateStudentZodSchema), student_controller_1.studentController.updateStudent);
router.get('/', student_controller_1.studentController.getAllStudents);
exports.studentRoutes = { router };
