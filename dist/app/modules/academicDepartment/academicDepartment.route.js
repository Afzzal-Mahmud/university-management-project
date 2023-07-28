"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const validateZodRequest_1 = __importDefault(require("../../middlewares/validateZodRequest"));
const academicDepartment_zod_validation_1 = require("./academicDepartment.zod.validation");
const router = express_1.default.Router();
router.post('/create-department', (0, validateZodRequest_1.default)(academicDepartment_zod_validation_1.academicDepartmentValidation.createAcademicDepartmentZodSchema), academicDepartment_controller_1.academicDepartmentController.createDepartment);
router.get('/:id', academicDepartment_controller_1.academicDepartmentController.getSingleDepartment);
router.patch('/:id', (0, validateZodRequest_1.default)(academicDepartment_zod_validation_1.academicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.academicDepartmentController.updateDepartment);
router.delete('/:id', academicDepartment_controller_1.academicDepartmentController.deleteDepartment);
router.get('/', academicDepartment_controller_1.academicDepartmentController.getAllDepartments);
exports.academicDepartmentRoute = { router };
