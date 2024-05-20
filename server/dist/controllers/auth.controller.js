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
exports.validateMentorLoginData = exports.validateLoginData = exports.logout = exports.login = void 0;
const StudentService = __importStar(require("../services/student.service"));
const zod_1 = require("../types/zod");
const responseHandler_1 = require("../utils/responseHandler");
const bcryptHandler_1 = require("../utils/bcryptHandler");
const jwtHandler_1 = require("../utils/jwtHandler");
const login = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRequest = request.body;
        const user = yield StudentService.getUserByEmail(userRequest.email);
        if (!user) {
            return (0, responseHandler_1.sendUnauthorizedResponse)(response, "Credentials Error");
        }
        const passwordCompare = yield (0, bcryptHandler_1.comparePasswords)(userRequest.password, user.password);
        if (passwordCompare) {
            const myID = "" + user.id;
            const token = (0, jwtHandler_1.generateToken)({ id: myID }, "30d");
            response.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            const responseData = {
                id: user.id,
                name: user.firstname + " " + user.lastname,
                email: user.email,
                marks: user.marks,
                mentorId: user.mentorId,
            };
            return (0, responseHandler_1.sendSuccessResponse)(response, responseData);
        }
        else {
            return (0, responseHandler_1.sendUnauthorizedResponse)(response, "Credentials Error");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        response.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        request.user = undefined;
        return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Logout Successful");
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
// Middlewares ________________________
const validateLoginData = (request, response, next) => {
    try {
        const data = request.body;
        zod_1.userSchema.parse(data);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateLoginData = validateLoginData;
const validateMentorLoginData = (request, response, next) => {
    try {
        const data = request.body;
        zod_1.mentorSchema.parse(data);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateMentorLoginData = validateMentorLoginData;
