"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const notFoundHandler = (request, response, next) => {
    const notFoundMessage = {
        Requested_URL: request.originalUrl,
        success: false,
        error: "Error 404 - Not Found",
    };
    return (0, responseHandler_1.sendNotFoundResponse)(response, notFoundMessage);
};
exports.notFoundHandler = notFoundHandler;
