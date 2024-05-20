"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectAuthForMentor = exports.protectAuth = exports.authorizeAdmin = exports.isAuthenticated = void 0;
const StudentService = __importStar(require("../services/student.service"));
const MentorService = __importStar(require("../services/mentor.service"));
const responseHandler_1 = require("../utils/responseHandler");
const jwtHandler_1 = require("../utils/jwtHandler");
const protectAuth = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allCookies = request.cookies;
    console.log(allCookies.token);
    const token = allCookies.token;
    if (token) {
        console.log("hit");
        try {
            const decoded = (0, jwtHandler_1.verifyToken)(token);
            console.log(decoded);
            const authUser = yield StudentService.getStudentByID(decoded.id);
            if (authUser === null || authUser === void 0 ? void 0 : authUser.email) {
                request.user = authUser;
            }
            next();
        }
        catch (error) {
            console.log("protectAuth error");
            next(error);
        }
    }
    else {
        return (0, responseHandler_1.sendBadRequestResponse)(response, "Unauthorized - you need to login");
    }
});
exports.protectAuth = protectAuth;
const protectAuthForMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allCookies = request.cookies;
    const token = allCookies.tokenm;
    console.log("hit");
    console.log(allCookies);
    if (token) {
        try {
            const decoded = (0, jwtHandler_1.verifyToken)(token);
            console.log(decoded);
            const authUser = yield MentorService.getMentorByID(decoded.id);
            if (authUser === null || authUser === void 0 ? void 0 : authUser.email) {
                request.mentor = authUser;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
    else {
        return (0, responseHandler_1.sendBadRequestResponse)(response, "Unauthorized - you need to login");
    }
});
exports.protectAuthForMentor = protectAuthForMentor;
const isAuthenticated = (request, response, next) => {
    try {
        const token = request.cookies["jwt"];
        if (token === "") {
            (0, responseHandler_1.sendForbiddenResponse)(response);
        }
        else {
            next();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.isAuthenticated = isAuthenticated;
const authorizeAdmin = (request, response, next) => {
    var _a;
    try {
        if (((_a = request.user) === null || _a === void 0 ? void 0 : _a.email) === "admin@gmail.com") {
            next();
        }
    }
    catch (e) {
        next(e);
    }
};
exports.authorizeAdmin = authorizeAdmin;
