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
exports.validateMentorData = exports.checkExistingMentor = exports.studentsUnderMentor = exports.updateMarksOfExistingStudent = exports.deleteMentor = exports.updateMentor = exports.createMentor = exports.detailsStudent = exports.getMentor = exports.listMentor = void 0;
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const MentorService = __importStar(require("../services/mentor.service"));
const StudentService = __importStar(require("../services/student.service"));
const zod_1 = require("../types/zod");
const responseHandler_1 = require("../utils/responseHandler");
const listMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield MentorService.listMentor();
        return (0, responseHandler_1.sendSuccessResponse)(response, data);
    }
    catch (error) {
        next(error);
    }
});
exports.listMentor = listMentor;
const getMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        const data = yield MentorService.getMentor(id);
        return (0, responseHandler_1.sendSuccessResponse)(response, data);
    }
    catch (error) {
        next(error);
    }
});
exports.getMentor = getMentor;
const detailsStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user != undefined) {
            const students = yield MentorService.detailsMentor(request.user.id);
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
const createMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mentor = request.body;
        const data = yield MentorService.createMentor(mentor);
        return (0, responseHandler_1.sendSuccessResponse)(response, data, HttpStatusCode_1.default.CREATED);
    }
    catch (error) {
        next(error);
    }
});
exports.createMentor = createMentor;
const updateMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        const mentor = request.body;
        const updateMentor = yield MentorService.updateMentor(mentor, id);
        return (0, responseHandler_1.sendSuccessResponse)(response, updateMentor);
    }
    catch (error) {
        next(error);
    }
});
exports.updateMentor = updateMentor;
const deleteMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        yield MentorService.deleteMentor(id);
        return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Mentor has been deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMentor = deleteMentor;
const updateMarksOfExistingStudent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id, 10);
        const marks = parseInt(request.body.marks);
        const data = yield StudentService.updateMarks(id, marks);
        if (!data) {
            return (0, responseHandler_1.sendNotFoundResponse)(response, "Student Not Found");
        }
        return (0, responseHandler_1.sendSuccessResponse)(response, data, HttpStatusCode_1.default.OK);
    }
    catch (error) {
        next(error);
    }
});
exports.updateMarksOfExistingStudent = updateMarksOfExistingStudent;
const studentsUnderMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const data = yield StudentService.studentUnderMentor(id);
        if (!data) {
            return (0, responseHandler_1.sendNotFoundResponse)(response, "Student Not Found");
        }
        return (0, responseHandler_1.sendSuccessResponse)(response, data, HttpStatusCode_1.default.OK);
    }
    catch (error) {
        next(error);
    }
});
exports.studentsUnderMentor = studentsUnderMentor;
const checkExistingMentor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(request.params.id);
        const existingMentor = yield MentorService.getMentor(Id);
        if (!existingMentor) {
            return (0, responseHandler_1.sendNotFoundResponse)(response, "Mentor Not Found");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkExistingMentor = checkExistingMentor;
const validateMentorData = (request, response, next) => {
    try {
        const data = request.body;
        zod_1.mentorSchema.parse(data);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateMentorData = validateMentorData;
