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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStudentData = exports.checkExistingStudentByEmail = exports.checkExistingStudent = exports.assignMentor = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudent = exports.detailsStudent = exports.listStudent = void 0;
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const StudentService = __importStar(require("../services/student.service"));
const MentorService = __importStar(require("../services/mentor.service"));
const zod_1 = require("../types/zod");
const responseHandler_1 = require("../utils/responseHandler");
const listStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield StudentService.listStudent();
        return (0, responseHandler_1.sendSuccessResponse)(response, students);
    }
    catch (error) {
        next(error);
    }
});
exports.listStudent = listStudent;
const detailsStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user != undefined) {
            const students = yield StudentService.detailsStudent(request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, students);
        }
        else {
            throw Error("Undefined issue");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.detailsStudent = detailsStudent;
const getStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        const author = yield StudentService.getStudent(id);
        return (0, responseHandler_1.sendSuccessResponse)(response, author);
    }
    catch (error) {
        next(error);
    }
});
exports.getStudent = getStudent;
const createStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = request.body;
        const newAuthor = yield StudentService.createStudent(author);
        return (0, responseHandler_1.sendSuccessResponse)(response, newAuthor, HttpStatusCode_1.default.CREATED);
    }
    catch (error) {
        next(error);
    }
});
exports.createStudent = createStudent;
const updateStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        const author = request.body;
        const updatedAuthor = yield StudentService.updateStudentDetails(author, id);
        return (0, responseHandler_1.sendSuccessResponse)(response, updatedAuthor);
    }
    catch (error) {
        next(error);
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        yield StudentService.deleteStudent(id);
        return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Author has been deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStudent = deleteStudent;
const assignMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendValidationError)(response, "There is user autheentication error", [], HttpStatusCode_1.default.CONFLICT);
        }
        const id = parseInt(request.params.id, 10);
        const preferences = request.body;
        for (let i = 0; i < preferences.length; i++) {
            const num = yield StudentService.countMentor(preferences[i]);
            if (num < 10) {
                const user = request.user;
                if (user != undefined) {
                    const updatedData = yield StudentService.updateStudentMentor(id, preferences[i]);
                    return (0, responseHandler_1.sendSuccessResponse)(response, updatedData, HttpStatusCode_1.default.OK);
                }
                else {
                    return (0, responseHandler_1.sendValidationError)(response, "There is user autheentication error", [], HttpStatusCode_1.default.CONFLICT);
                }
            }
            else {
                continue;
            }
        }
        const teachers = yield MentorService.listMentor();
        const random = Math.floor(Math.random() * teachers.length);
        if (request.user == undefined) {
            return (0, responseHandler_1.sendValidationError)(response, "There is user autheentication error", [], HttpStatusCode_1.default.CONFLICT);
        }
        const updatedData = yield StudentService.updateStudentMentor(request.user.id, preferences[random]);
        return (0, responseHandler_1.sendSuccessResponse)(response, updatedData, HttpStatusCode_1.default.OK);
    }
    catch (error) {
        next(error);
    }
});
exports.assignMentor = assignMentor;
// <-----------------------------------Pre Check Functions ---------------------------------------------------->
// some controller functions for pre checks
const checkExistingStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        const student = yield StudentService.getStudent(id);
        if (!student) {
            return (0, responseHandler_1.sendNotFoundResponse)(response, "Student Not Found");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkExistingStudent = checkExistingStudent;
const checkExistingStudentByEmail = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = request.body.email;
        const student = yield StudentService.getUserByEmail(email);
        console.log(student);
        if (!student) {
            return (0, responseHandler_1.sendNotFoundResponse)(response, "Student Not Found");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkExistingStudentByEmail = checkExistingStudentByEmail;
const validateStudentData = (request, response, next) => {
    try {
        const student = request.body; // this particular body contains only first name and lastname and other user credentials
        zod_1.studentCreateSchema.parse(student);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateStudentData = validateStudentData;
