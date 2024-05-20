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
exports.deleteEndTermReport = exports.deleteEndTermPresentation = exports.deleteMidTermPresentation = exports.deleteCertificate = exports.deleteJoiningReport = exports.deleteSynopsis = exports.getNameOfFile = exports.downloadCertificate = exports.downloadJoiningReport = exports.downloadSynopsis = exports.updateEndTermMarks = exports.updateEndTermReport = exports.updateEndTermPresentation = exports.updateMidTermPresentation = exports.updateSlot = exports.updateProjectCertificate = exports.updateProjectJoiningReport = exports.updateProjectSynopsis = exports.updateProjectTitle = exports.createProject = exports.detailsProjectById = exports.detailsProject = void 0;
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const ProjectService = __importStar(require("../services/project.service"));
const responseHandler_1 = require("../utils/responseHandler");
const google_1 = require("../utils/google");
const detailsProject = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.detailsProject = detailsProject;
const detailsProjectById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const details = yield ProjectService.detailsProject(id);
        return (0, responseHandler_1.sendSuccessResponse)(response, details);
    }
    catch (error) {
        next(error);
    }
});
exports.detailsProjectById = detailsProjectById;
const createProject = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const { title } = request.body;
            const details = yield ProjectService.createProject(title, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createProject = createProject;
// <---------------------------------Update  Controllers ------------------------------------->
const updateProjectTitle = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const { title } = request.body;
            const details = yield ProjectService.updateProjectTitle(title, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateProjectTitle = updateProjectTitle;
const updateProjectSynopsis = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const synopsis = request.file;
            if (!synopsis) {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "File not Found", HttpStatusCode_1.default.NOT_FOUND);
            }
            const details = yield ProjectService.updateProjectSynopsis(synopsis, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateProjectSynopsis = updateProjectSynopsis;
const updateProjectJoiningReport = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const joiningReport = request.file;
            if (!joiningReport) {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "File not Found", HttpStatusCode_1.default.NOT_FOUND);
            }
            const details = yield ProjectService.updateProjectJoiningReport(joiningReport, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateProjectJoiningReport = updateProjectJoiningReport;
const updateProjectCertificate = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const certificate = request.file;
            if (!certificate) {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "File not Found", HttpStatusCode_1.default.NOT_FOUND);
            }
            const details = yield ProjectService.updateProjectCertificate(certificate, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateProjectCertificate = updateProjectCertificate;
const updateSlot = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const { slot } = request.body;
            if (slot == "") {
                return (0, responseHandler_1.sendNotFoundResponse)(response, {
                    message: "There exits no data regarding the slot details",
                });
            }
            else {
                const res = yield ProjectService.updateSlot(slot, request.user.id);
                return (0, responseHandler_1.sendSuccessResponse)(response, res, HttpStatusCode_1.default.OK);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateSlot = updateSlot;
const updateMidTermPresentation = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const presentation = request.file;
            if (!presentation) {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "File not Found", HttpStatusCode_1.default.NOT_FOUND);
            }
            const details = yield ProjectService.updateMidTermPresentation(presentation, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateMidTermPresentation = updateMidTermPresentation;
const updateEndTermPresentation = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const presentation = request.file;
            if (!presentation) {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "File not Found", HttpStatusCode_1.default.NOT_FOUND);
            }
            const details = yield ProjectService.updateEndTermPresentation(presentation, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateEndTermPresentation = updateEndTermPresentation;
const updateEndTermReport = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const report = request.file;
            if (!report) {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "File not Found", HttpStatusCode_1.default.NOT_FOUND);
            }
            const details = yield ProjectService.updateEndTermReport(report, request.user.id);
            return (0, responseHandler_1.sendSuccessResponse)(response, details);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateEndTermReport = updateEndTermReport;
const updateEndTermMarks = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.mentor == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const marks = parseInt(request.body.marks);
            const id = parseInt(request.params.id);
            if (marks == 0) {
                return (0, responseHandler_1.sendNotFoundResponse)(response, {
                    message: "There exits no data regarding the slot details",
                });
            }
            else {
                const res = yield ProjectService.updateEndTermMarks(marks, id);
                return (0, responseHandler_1.sendSuccessResponse)(response, res, HttpStatusCode_1.default.OK);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateEndTermMarks = updateEndTermMarks;
// <---------------------------------download Controllers ------------------------------------->
const downloadSynopsis = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.synopsis != null) {
                const fileId = details.synopsis;
                const downloadUrl = `https://drive.google.com/uc?id=${fileId}`;
                response.redirect(downloadUrl);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.downloadSynopsis = downloadSynopsis;
const downloadJoiningReport = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.joiningReport != null) {
                const fileId = details.joiningReport;
                const downloadUrl = `https://drive.google.com/uc?id=${fileId}`;
                response.status(200).json({ url: downloadUrl });
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.downloadJoiningReport = downloadJoiningReport;
const downloadCertificate = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.completionCertificate != null) {
                const fileId = details.completionCertificate;
                const downloadUrl = `https://drive.google.com/uc?id=${fileId}`;
                response.redirect(downloadUrl);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.downloadCertificate = downloadCertificate;
const getNameOfFile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const fileId = request.params.id;
            const result = yield (0, google_1.getFile)(fileId);
            return (0, responseHandler_1.sendSuccessResponse)(response, { name: result }, HttpStatusCode_1.default.OK);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getNameOfFile = getNameOfFile;
// <---------------------------------Delete Controllers for The files ------------------------------------->
const deleteSynopsis = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.synopsis != null) {
                yield ProjectService.SetSynopsisNull(request.user.id);
                return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Sucess fully deleted", HttpStatusCode_1.default.OK);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSynopsis = deleteSynopsis;
const deleteJoiningReport = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.joiningReport != null) {
                yield ProjectService.SetReportNull(request.user.id);
                return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Sucess fully deleted", HttpStatusCode_1.default.OK);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJoiningReport = deleteJoiningReport;
const deleteCertificate = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.completionCertificate != null) {
                yield ProjectService.SetCertificateNull(request.user.id);
                return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Sucess fully deleted", HttpStatusCode_1.default.OK);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCertificate = deleteCertificate;
const deleteMidTermPresentation = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.midterm != null) {
                yield ProjectService.SetMidTermPresentationNull(request.user.id);
                return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Sucess fully deleted", HttpStatusCode_1.default.OK);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMidTermPresentation = deleteMidTermPresentation;
const deleteEndTermPresentation = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.endterm != null) {
                yield ProjectService.SetEndTermPresentationNull(request.user.id);
                return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Sucess fully deleted", HttpStatusCode_1.default.OK);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEndTermPresentation = deleteEndTermPresentation;
const deleteEndTermReport = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.user == undefined) {
            return (0, responseHandler_1.sendErrorResponse)(response, "There is authentication issue please login correctly with the correct user", HttpStatusCode_1.default.FORBIDDEN);
        }
        else {
            const details = yield ProjectService.detailsProject(request.user.id);
            if (details != null && details.endtermreport != null) {
                yield ProjectService.SetEndTermReportNull(request.user.id);
                return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Sucess fully deleted", HttpStatusCode_1.default.OK);
            }
            else {
                return (0, responseHandler_1.sendNotFoundResponse)(response, "There was no data found for the user", HttpStatusCode_1.default.NOT_FOUND);
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEndTermReport = deleteEndTermReport;
