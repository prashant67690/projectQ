"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
const responseHandler_1 = require("../utils/responseHandler");
const errorHandler = (error, request, response, next) => {
    // Log the error stack for debugging purposes
    /*
  
     REPLACE IT WITH WINSTON
      console.error(error.stack);
    */
    // Handle Zod validation errors
    if (error instanceof zod_1.z.ZodError) {
        const errors = error.errors.map((e) => e.message);
        return (0, responseHandler_1.sendValidationError)(response, "Validation Error", errors);
    }
    // Handle known Prisma errors
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const res = process.env.APP_ENV == "developement"
            ? { error: "Prisma Error occurred", details: error }
            : { error: "Error occurred" };
        return (0, responseHandler_1.sendBadRequestResponse)(response, res);
    }
    // Handle Json Web Token Error
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        const res = process.env.APP_ENV == "developement"
            ? { error: "Json Web Token Error occurred", message: error }
            : { error: "Error occurred" };
        return (0, responseHandler_1.sendBadRequestResponse)(response, res);
    }
    // Handle other types of errors
    const res = process.env.APP_ENV == "developement"
        ? { message: error.message }
        : { message: "Internal Server Error" };
    return (0, responseHandler_1.sendErrorResponse)(response, res);
};
exports.errorHandler = errorHandler;
