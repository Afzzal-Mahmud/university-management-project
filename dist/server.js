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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const logger_1 = require("./shared/logger");
let server;
function shutdown() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (server) {
                yield new Promise((resolve, reject) => {
                    server.close(err => {
                        if (err) {
                            logger_1.errorLogger.error(`Error while closing server: ${err}`);
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                });
            }
            yield mongoose_1.default.disconnect();
            logger_1.successLogger.info('Server gracefully shut down.');
            process.exit(0);
        }
        catch (error) {
            logger_1.errorLogger.error(`Error during server shutdown: ${error}`);
            process.exit(1);
        }
    });
}
process.on('SIGINT', () => {
    logger_1.successLogger.info('SIGINT is received');
    logger_1.gracefullyShutdown.info('SIGINT is received');
    shutdown();
});
process.on('SIGTERM', () => {
    logger_1.successLogger.info('SIGTERM is received');
    logger_1.gracefullyShutdown.info('SIGTERM is received');
    shutdown();
});
process.on('uncaughtException', error => {
    logger_1.errorLogger.error(error);
    logger_1.gracefullyShutdown.info('uncaughtException is received');
    shutdown();
});
process.on('unhandledRejection', error => {
    logger_1.errorLogger.error(error);
    logger_1.gracefullyShutdown.info('unhandledRejection is received');
    shutdown();
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(index_1.default.database_url);
            logger_1.successLogger.info('Database is connected successfully');
            server = app_1.default.listen(index_1.default.port, () => {
                logger_1.successLogger.info(`University Application listening on port ${index_1.default.port}`);
            });
        }
        catch (error) {
            logger_1.errorLogger.error('Failed to connect to the database', error);
        }
    });
}
main();
