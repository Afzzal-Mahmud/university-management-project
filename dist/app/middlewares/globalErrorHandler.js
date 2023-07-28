"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if (err instanceof mongoose_1.Error.ValidationError) {
        statusCode = 400;
        message = 'Validation Error';
        errorMessages = Object.values(err.errors).map(error => ({
            path: error.path,
            message: error.message,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        }));
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Zod Error';
        /*valuesFromZodErr returns array of object so,
                I thought distructuring[] would be good*/
        const [valuesFromZodErr] = err.issues.map(issue => ({
            /* path returns array of array where we
            are only taking the last property*/
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }));
        const zodPath = valuesFromZodErr.path;
        const zodMessage = valuesFromZodErr.message;
        errorMessages.push({
            path: zodPath,
            message: zodMessage,
        });
    }
    else if (err instanceof mongoose_1.Error.CastError) {
        statusCode = 400;
        message = 'Cast Error';
        errorMessages.push({
            path: err.path,
            message: `CastError: ${err.message}`,
            stack: err === null || err === void 0 ? void 0 : err.stack,
        });
    }
    else if (err instanceof ApiErrors_1.default) {
        statusCode = err.statusCode;
        message = 'Api Error';
        errorMessages.push({
            path: '',
            message: `ApiError: ${err.message}`,
            stack: err === null || err === void 0 ? void 0 : err.stack,
        });
    }
    else if (err instanceof Error) {
        errorMessages.push({
            path: 'unknown path',
            message: `Extra Error: ${err.message}`,
            stack: err === null || err === void 0 ? void 0 : err.stack,
        });
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : message,
    });
};
exports.default = globalErrorHandler;
