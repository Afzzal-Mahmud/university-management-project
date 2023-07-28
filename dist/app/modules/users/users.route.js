"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const validateZodRequest_1 = __importDefault(require("../../middlewares/validateZodRequest"));
const users_zod_validation_schema_1 = require("./users.zod.validation.schema");
const router = express_1.default.Router();
router.post('/create-student', (0, validateZodRequest_1.default)(users_zod_validation_schema_1.userValidation.userZodSchema), users_controller_1.userControllers.createNewStudent);
exports.userRoutes = { router };
