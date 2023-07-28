"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.gracefullyShutdown = exports.successLogger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
/* 1. install winston and winston-daily-rotate-file
   2. define the formet the way you want to see the log, from winston doc
   3. create file transporter function
   4. create whatever log you wants to see
   */
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const formattedTimestamp = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
    return `${date.toDateString()}, TIME : 
  ${formattedTimestamp} [${label}] ${level}: ${message}`;
});
const customTimestamp = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });
/* created file transporter function to use in two logs*/
const createFileTransport = (filename) => new winston_daily_rotate_file_1.default({
    filename,
    datePattern: 'YYYY-DD-MM-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});
const successLogger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'PHU SUCCESS LOG' }), customTimestamp, myFormat, prettyPrint()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.Console(),
        createFileTransport(path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'success-%DATE%.log')),
    ],
});
exports.successLogger = successLogger;
const gracefullyShutdown = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'PHU GRACEFULL LOG' }), customTimestamp, myFormat, prettyPrint()),
    defaultMeta: { service: 'gracefull-shutdown-server-info' },
    transports: [
        new winston_1.transports.Console(),
        createFileTransport(path_1.default.join(process.cwd(), 'logs', 'winston', 'gracefully-shutdown-info', 'shutdown-%DATE%.log')),
    ],
});
exports.gracefullyShutdown = gracefullyShutdown;
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'PHU SUCCESS LOG' }), customTimestamp, myFormat, prettyPrint()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.Console(),
        createFileTransport(path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'error-%DATE%.log')),
    ],
});
exports.errorLogger = errorLogger;
