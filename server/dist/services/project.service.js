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
exports.SetEndTermReportNull = exports.SetEndTermPresentationNull = exports.SetMidTermPresentationNull = exports.SetCertificateNull = exports.SetReportNull = exports.SetSynopsisNull = exports.updateEndTermMarks = exports.updateEndTermReport = exports.updateEndTermPresentation = exports.updateMidTermPresentation = exports.updateSlot = exports.updateProjectCertificate = exports.updateProjectJoiningReport = exports.updateProjectSynopsis = exports.updateProjectTitle = exports.createProject = exports.detailsProject = void 0;
const db_server_1 = require("../utils/db.server");
const google_1 = require("../utils/google");
const detailsProject = (inputid) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.findFirst({
        where: {
            studentId: inputid,
        },
    });
});
exports.detailsProject = detailsProject;
const createProject = (title, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.project.create({
        data: {
            title,
            studentId: id,
        },
    });
});
exports.createProject = createProject;
// Updating the Poject details
const updateProjectTitle = (title, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            title,
        },
    });
});
exports.updateProjectTitle = updateProjectTitle;
const updateProjectSynopsis = (synopsis, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.synopsis) != undefined || (existingFile === null || existingFile === void 0 ? void 0 : existingFile.synopsis) != null) {
        const fileId = existingFile.synopsis;
        yield (0, google_1.deleteFile)(fileId);
    }
    const data = yield (0, google_1.uploadFile)(synopsis);
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            synopsis: data.id,
        },
    });
});
exports.updateProjectSynopsis = updateProjectSynopsis;
const updateProjectJoiningReport = (report, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.joiningReport) != undefined ||
        (existingFile === null || existingFile === void 0 ? void 0 : existingFile.joiningReport) != null) {
        const fileId = existingFile.joiningReport;
        yield (0, google_1.deleteFile)(fileId);
    }
    const data = yield (0, google_1.uploadFile)(report);
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            joiningReport: data.id,
        },
    });
});
exports.updateProjectJoiningReport = updateProjectJoiningReport;
const updateProjectCertificate = (certificate, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.completionCertificate) != undefined ||
        (existingFile === null || existingFile === void 0 ? void 0 : existingFile.completionCertificate) != null) {
        const fileId = existingFile.completionCertificate;
        yield (0, google_1.deleteFile)(fileId);
    }
    const data = yield (0, google_1.uploadFile)(certificate);
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            completionCertificate: data.id,
        },
    });
});
exports.updateProjectCertificate = updateProjectCertificate;
const updateSlot = (slot, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            slot,
        },
    });
});
exports.updateSlot = updateSlot;
const updateMidTermPresentation = (presentation, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.midterm) != undefined || (existingFile === null || existingFile === void 0 ? void 0 : existingFile.midterm) != null) {
        const fileId = existingFile.midterm;
        yield (0, google_1.deleteFile)(fileId);
    }
    const data = yield (0, google_1.uploadFile)(presentation);
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            midterm: data.id,
        },
    });
});
exports.updateMidTermPresentation = updateMidTermPresentation;
const updateEndTermPresentation = (presentation, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.endterm) != undefined || (existingFile === null || existingFile === void 0 ? void 0 : existingFile.endterm) != null) {
        const fileId = existingFile.endterm;
        yield (0, google_1.deleteFile)(fileId);
    }
    const data = yield (0, google_1.uploadFile)(presentation);
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            endterm: data.id,
        },
    });
});
exports.updateEndTermPresentation = updateEndTermPresentation;
const updateEndTermReport = (report, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.endtermreport) != undefined ||
        (existingFile === null || existingFile === void 0 ? void 0 : existingFile.endtermreport) != null) {
        const fileId = existingFile.endtermreport;
        yield (0, google_1.deleteFile)(fileId);
    }
    const data = yield (0, google_1.uploadFile)(report);
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            endtermreport: data.id,
        },
    });
});
exports.updateEndTermReport = updateEndTermReport;
const updateEndTermMarks = (marks, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hit the service ");
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            endtermmarks: marks,
        },
    });
});
exports.updateEndTermMarks = updateEndTermMarks;
// setting the files Null services
const SetSynopsisNull = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.synopsis) != undefined || (existingFile === null || existingFile === void 0 ? void 0 : existingFile.synopsis) != null) {
        const fileId = existingFile.synopsis;
        yield (0, google_1.deleteFile)(fileId);
    }
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            synopsis: null,
        },
    });
});
exports.SetSynopsisNull = SetSynopsisNull;
const SetReportNull = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.joiningReport) != undefined ||
        (existingFile === null || existingFile === void 0 ? void 0 : existingFile.joiningReport) != null) {
        const fileId = existingFile.joiningReport;
        yield (0, google_1.deleteFile)(fileId);
    }
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            joiningReport: null,
        },
    });
});
exports.SetReportNull = SetReportNull;
const SetCertificateNull = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.completionCertificate) != undefined ||
        (existingFile === null || existingFile === void 0 ? void 0 : existingFile.completionCertificate) != null) {
        const fileId = existingFile.completionCertificate;
        yield (0, google_1.deleteFile)(fileId);
    }
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            completionCertificate: null,
        },
    });
});
exports.SetCertificateNull = SetCertificateNull;
const SetMidTermPresentationNull = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.midterm) != undefined || (existingFile === null || existingFile === void 0 ? void 0 : existingFile.midterm) != null) {
        const fileId = existingFile.midterm;
        yield (0, google_1.deleteFile)(fileId);
    }
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            midterm: null,
        },
    });
});
exports.SetMidTermPresentationNull = SetMidTermPresentationNull;
const SetEndTermPresentationNull = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.endterm) != undefined || (existingFile === null || existingFile === void 0 ? void 0 : existingFile.endterm) != null) {
        const fileId = existingFile.endterm;
        yield (0, google_1.deleteFile)(fileId);
    }
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            endterm: null,
        },
    });
});
exports.SetEndTermPresentationNull = SetEndTermPresentationNull;
const SetEndTermReportNull = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield db_server_1.db.project.findFirst({
        where: {
            studentId: id,
        },
    });
    if ((existingFile === null || existingFile === void 0 ? void 0 : existingFile.endtermreport) != undefined ||
        (existingFile === null || existingFile === void 0 ? void 0 : existingFile.endtermreport) != null) {
        const fileId = existingFile.endtermreport;
        yield (0, google_1.deleteFile)(fileId);
    }
    return yield db_server_1.db.project.update({
        where: {
            studentId: id,
        },
        data: {
            endtermreport: null,
        },
    });
});
exports.SetEndTermReportNull = SetEndTermReportNull;
