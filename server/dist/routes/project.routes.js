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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const ProjectController = __importStar(require("../controllers/project.controller"));
const workingDirectoryPath = __dirname;
// setting up for the multer upload
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    },
});
// { storage: storage }
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.get("/", authMiddleware_1.protectAuth, ProjectController.detailsProject);
router.get("/:id", authMiddleware_1.protectAuthForMentor, ProjectController.detailsProjectById);
router.get("/fileName/:id", authMiddleware_1.protectAuth, ProjectController.getNameOfFile);
router.post("/", authMiddleware_1.protectAuth, ProjectController.createProject);
router.put("/title", authMiddleware_1.protectAuth, ProjectController.updateProjectTitle);
router.put("/slot", authMiddleware_1.protectAuth, ProjectController.updateSlot);
router.put("/endmarks/:id", authMiddleware_1.protectAuthForMentor, ProjectController.updateEndTermMarks);
// get and post routes for the files
router.get("/synopsis", authMiddleware_1.protectAuth, ProjectController.downloadSynopsis);
router.get("/report", authMiddleware_1.protectAuth, ProjectController.downloadJoiningReport);
router.get("/cert", authMiddleware_1.protectAuth, ProjectController.downloadCertificate);
router.post("/synopsis", authMiddleware_1.protectAuth, upload.single("file"), ProjectController.updateProjectSynopsis);
router.post("/report", authMiddleware_1.protectAuth, upload.single("file"), ProjectController.updateProjectJoiningReport);
router.post("/cert", authMiddleware_1.protectAuth, upload.single("file"), ProjectController.updateProjectCertificate);
// new post routes
router.post("/midterm", authMiddleware_1.protectAuth, upload.single("file"), ProjectController.updateMidTermPresentation);
router.post("/endterm", authMiddleware_1.protectAuth, upload.single("file"), ProjectController.updateEndTermPresentation);
router.post("/endreport", authMiddleware_1.protectAuth, upload.single("file"), ProjectController.updateEndTermReport);
router.delete("/synopsis", authMiddleware_1.protectAuth, ProjectController.deleteSynopsis);
router.delete("/report", authMiddleware_1.protectAuth, ProjectController.deleteJoiningReport);
router.delete("/cert", authMiddleware_1.protectAuth, ProjectController.deleteCertificate);
// new delete routes
router.delete("/midterm", authMiddleware_1.protectAuth, ProjectController.deleteMidTermPresentation);
router.delete("/endterm", authMiddleware_1.protectAuth, ProjectController.deleteEndTermPresentation);
router.delete("/endreport", authMiddleware_1.protectAuth, ProjectController.deleteEndTermReport);
exports.default = router;
