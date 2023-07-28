"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
// import { userControllers } from './users.controller'
const validateZodRequest_1 = __importDefault(require("../../middlewares/validateZodRequest"));
const academicSemester_zod_validation_1 = require("./academicSemester.zod.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post('/academic-semester', (0, validateZodRequest_1.default)(academicSemester_zod_validation_1.academicSemesterValidation.academicSemesterZodSchema), academicSemester_controller_1.academicSemesterControllers.createSemester);
router.patch('/:id', (0, validateZodRequest_1.default)(academicSemester_zod_validation_1.academicSemesterValidation.updateAcademicSemesterZodSchema), academicSemester_controller_1.academicSemesterControllers.updateSemester);
router.delete('/:id', academicSemester_controller_1.academicSemesterControllers.deleteSemester);
router.get('/:id', academicSemester_controller_1.academicSemesterControllers.getSingleSemester);
router.get('/', academicSemester_controller_1.academicSemesterControllers.getSemesters);
exports.academicSemesterRoute = { router };
