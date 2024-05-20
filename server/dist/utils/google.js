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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.downloadFile = exports.getFile = exports.uploadFile = exports.getDriveService = void 0;
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const stream_1 = __importDefault(require("stream"));
const KEYFILEPATH = path_1.default.join(__dirname, "secrets/cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});
const getDriveService = () => {
    const driveService = googleapis_1.google.drive({ version: "v3", auth });
    return driveService;
};
exports.getDriveService = getDriveService;
const uploadFile = (fileObject) => __awaiter(void 0, void 0, void 0, function* () {
    const bufferStream = new stream_1.default.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = yield googleapis_1.google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["1mhdlKEjdoUjnOy8nt-5MBA1ihoUod7XS"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data;
});
exports.uploadFile = uploadFile;
const getFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const drive = googleapis_1.google.drive({ version: "v3", auth });
    const { data } = yield drive.files.get({
        fileId,
        fields: "name, mimeType",
    });
    return data.name;
});
exports.getFile = getFile;
const downloadFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const drive = googleapis_1.google.drive({ version: "v3", auth });
    const { data } = yield drive.files.get({
        fileId,
        fields: "name, mimeType,webContentLink",
    });
    return data;
});
exports.downloadFile = downloadFile;
const deleteFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const drive = googleapis_1.google.drive({ version: "v3", auth });
    yield drive.files.delete({ fileId });
    console.log(`File ${fileId} deleted successfully`);
});
exports.deleteFile = deleteFile;
