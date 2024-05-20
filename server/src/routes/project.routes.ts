import express from "express";
import multer from "multer";
import * as path from "path";
import {
  protectAuth,
  protectAuthForMentor,
} from "../middleware/authMiddleware";
import * as ProjectController from "../controllers/project.controller";

const workingDirectoryPath = __dirname;

// setting up for the multer upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  },
});

// { storage: storage }
const upload = multer();

const router = express.Router();

router.get("/", protectAuth, ProjectController.detailsProject);

router.get("/:id", protectAuthForMentor, ProjectController.detailsProjectById);

router.get("/fileName/:id", protectAuth, ProjectController.getNameOfFile);

router.post("/", protectAuth, ProjectController.createProject);

router.put("/title", protectAuth, ProjectController.updateProjectTitle);

router.put("/slot", protectAuth, ProjectController.updateSlot);

router.put(
  "/endmarks/:id",
  protectAuthForMentor,
  ProjectController.updateEndTermMarks
);

// get and post routes for the files

router.get("/synopsis", protectAuth, ProjectController.downloadSynopsis);

router.get("/report", protectAuth, ProjectController.downloadJoiningReport);

router.get("/cert", protectAuth, ProjectController.downloadCertificate);

router.post(
  "/synopsis",
  protectAuth,
  upload.single("file"),
  ProjectController.updateProjectSynopsis
);

router.post(
  "/report",
  protectAuth,
  upload.single("file"),
  ProjectController.updateProjectJoiningReport
);

router.post(
  "/cert",
  protectAuth,
  upload.single("file"),
  ProjectController.updateProjectCertificate
);

// new post routes
router.post(
  "/midterm",
  protectAuth,
  upload.single("file"),
  ProjectController.updateMidTermPresentation
);

router.post(
  "/endterm",
  protectAuth,
  upload.single("file"),
  ProjectController.updateEndTermPresentation
);

router.post(
  "/endreport",
  protectAuth,
  upload.single("file"),
  ProjectController.updateEndTermReport
);

router.delete("/synopsis", protectAuth, ProjectController.deleteSynopsis);

router.delete("/report", protectAuth, ProjectController.deleteJoiningReport);

router.delete("/cert", protectAuth, ProjectController.deleteCertificate);

// new delete routes

router.delete(
  "/midterm",
  protectAuth,
  ProjectController.deleteMidTermPresentation
);

router.delete(
  "/endterm",
  protectAuth,
  ProjectController.deleteEndTermPresentation
);

router.delete("/endreport", protectAuth, ProjectController.deleteEndTermReport);

export default router;
