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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentUnderMentor = exports.updateMarks = exports.updateStudentMentor = exports.countMentor = exports.deleteStudent = exports.updateStudentDetails = exports.createStudent = exports.getUserByEmail = exports.getStudentByID = exports.getStudent = exports.detailsStudent = exports.listStudent = void 0;
const db_server_1 = require("../utils/db.server");
const listStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.student.findMany({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            department: true,
            marks: true,
            mentorId: true,
        },
    });
});
exports.listStudent = listStudent;
const detailsStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.student.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            department: true,
            marks: true,
            password: true,
            mentorId: true,
        },
    });
});
exports.detailsStudent = detailsStudent;
const getStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.student.findUnique({
        where: {
            id: id,
        },
    });
});
exports.getStudent = getStudent;
const getStudentByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newid = Number.parseInt(id, 10);
    return db_server_1.db.student.findUnique({
        where: {
            id: newid,
        },
    });
});
exports.getStudentByID = getStudentByID;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    return db_server_1.db.student.findUnique({
        where: {
            email: email,
        },
    });
});
exports.getUserByEmail = getUserByEmail;
// this is for creation of the student in the server
const createStudent = (studentDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, department } = studentDetails;
    return db_server_1.db.student.create({
        data: {
            email,
            firstname,
            lastname,
            password,
            department,
        },
    });
});
exports.createStudent = createStudent;
const updateStudentDetails = (student, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstname, lastname, password, department } = student;
    return yield db_server_1.db.student.update({
        where: {
            id: id,
        },
        data: {
            email,
            firstname,
            lastname,
            password,
            department,
        },
    });
});
exports.updateStudentDetails = updateStudentDetails;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.student.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteStudent = deleteStudent;
const countMentor = (mentorId) => __awaiter(void 0, void 0, void 0, function* () {
    const studentCount = yield db_server_1.db.student.findMany({
        where: {
            mentorId: mentorId,
        },
    });
    return studentCount.length;
});
exports.countMentor = countMentor;
const updateStudentMentor = (id, mentorId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.student.update({
        where: {
            id: id,
        },
        data: {
            mentorId: mentorId,
        },
    });
});
exports.updateStudentMentor = updateStudentMentor;
const updateMarks = (id, marks) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.student.update({
        where: {
            id: id,
        },
        data: {
            marks: marks,
        },
    });
});
exports.updateMarks = updateMarks;
const studentUnderMentor = (mentorid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.student.findMany({
        where: {
            mentorId: mentorid,
        },
    });
});
exports.studentUnderMentor = studentUnderMentor;
