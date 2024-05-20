"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBadRequestResponse = exports.sendForbiddenResponse = exports.sendUnauthorizedResponse = exports.sendValidationError = exports.sendNotFoundResponse = exports.sendErrorResponse = exports.sendSuccessNoDataResponse = exports.sendSuccessResponse = void 0;
const HttpStatusCode_1 = __importDefault(require("./HttpStatusCode"));
// Success response with data
const sendSuccessResponse = (res, data, status = HttpStatusCode_1.default.OK) => {
    return res.status(status).json({ success: true, data });
};
exports.sendSuccessResponse = sendSuccessResponse;
// Success response without data
const sendSuccessNoDataResponse = (res, message = "Operation successful", status = HttpStatusCode_1.default.OK) => {
    return res.status(status).json({ success: true, message });
};
exports.sendSuccessNoDataResponse = sendSuccessNoDataResponse;
// Error response
const sendErrorResponse = (res, message, status = HttpStatusCode_1.default.INTERNAL_SERVER_ERROR) => {
    return res.status(status).json({ success: false, error: { message } });
};
exports.sendErrorResponse = sendErrorResponse;
// Not Found response
const sendNotFoundResponse = (res, message, status = HttpStatusCode_1.default.NOT_FOUND) => {
    return res.status(status).json({ success: false, error: { message } });
};
exports.sendNotFoundResponse = sendNotFoundResponse;
// Validation Error response
const sendValidationError = (res, message, errors, status = HttpStatusCode_1.default.BAD_REQUEST) => {
    return res.status(status).json({
        success: false,
        error: {
            message: message,
            errors: errors,
        },
    });
};
exports.sendValidationError = sendValidationError;
// Unauthorized response
const sendUnauthorizedResponse = (res, message = "Unauthorized", status = HttpStatusCode_1.default.UNAUTHORIZED) => {
    return res.status(status).json({ success: false, error: { message } });
};
exports.sendUnauthorizedResponse = sendUnauthorizedResponse;
// Forbidden response
const sendForbiddenResponse = (res, message = "Forbidden", status = HttpStatusCode_1.default.FORBIDDEN) => {
    return res.status(status).json({ success: false, error: { message } });
};
exports.sendForbiddenResponse = sendForbiddenResponse;
// Bad Request response
const sendBadRequestResponse = (res, message, status = HttpStatusCode_1.default.BAD_REQUEST) => {
    return res.status(status).json({ success: false, error: { message } });
};
exports.sendBadRequestResponse = sendBadRequestResponse;
