"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const router = express_1.default.Router();
router.get('/:id', faculty_controller_1.facultyControllers.getSingleFaculty);
router.patch('/:id', faculty_controller_1.facultyControllers.updateFaculty);
router.delete('/:id', faculty_controller_1.facultyControllers.deleteFaculty);
router.get('/', faculty_controller_1.facultyControllers.getAllFaculties);
exports.facultyRoutes = { router };
