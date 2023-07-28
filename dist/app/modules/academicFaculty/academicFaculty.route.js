"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateZodRequest_1 = __importDefault(require("../../middlewares/validateZodRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_zod_validation_1 = require("./academicFaculty.zod.validation");
const router = express_1.default.Router();
router.post('/create-faculty', (0, validateZodRequest_1.default)(academicFaculty_zod_validation_1.academicFacultyValidation.createFacultyZodSchema), academicFaculty_controller_1.academicFacultyController.createFaculty);
router.get('/:id', academicFaculty_controller_1.academicFacultyController.getSingleFaculty);
router.patch('/:id', (0, validateZodRequest_1.default)(academicFaculty_zod_validation_1.academicFacultyValidation.updatefacultyZodSchema), academicFaculty_controller_1.academicFacultyController.updateFaculty);
router.delete('/:id', academicFaculty_controller_1.academicFacultyController.deleteFaculty);
router.get('/', academicFaculty_controller_1.academicFacultyController.getAllFaculties);
exports.academicFacultyRoute = { router };
