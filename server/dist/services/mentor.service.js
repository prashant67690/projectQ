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
exports.deleteMentor = exports.updateMentor = exports.createMentor = exports.getMentorByID = exports.getMentorByEmail = exports.getMentor = exports.detailsMentor = exports.listMentor = void 0;
const db_server_1 = require("../utils/db.server");
const listMentor = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.mentor.findMany({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            department: true,
        },
    });
});
exports.listMentor = listMentor;
const detailsMentor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.mentor.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            department: true,
        },
    });
});
exports.detailsMentor = detailsMentor;
const getMentor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.mentor.findFirst({
        where: {
            id: id,
        },
    });
});
exports.getMentor = getMentor;
const getMentorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.mentor.findUnique({
        where: {
            email: email,
        },
    });
});
exports.getMentorByEmail = getMentorByEmail;
const getMentorByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newid = Number.parseInt(id, 10);
    return db_server_1.db.mentor.findUnique({
        where: {
            id: newid,
        },
    });
});
exports.getMentorByID = getMentorByID;
// this is for creation of the student in the server
const createMentor = (mentorDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, department } = mentorDetails;
    return db_server_1.db.mentor.create({
        data: {
            email,
            firstname,
            lastname,
            password,
            department,
        },
    });
});
exports.createMentor = createMentor;
const updateMentor = (mentor, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstname, lastname, password, department } = mentor;
    return db_server_1.db.mentor.update({
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
exports.updateMentor = updateMentor;
const deleteMentor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.mentor.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteMentor = deleteMentor;
