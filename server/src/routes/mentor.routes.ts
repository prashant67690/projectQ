import express from "express";
import * as MentorController from "../controllers/mentor.controller";
import { protectAuthForMentor } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", MentorController.listMentor);

router.get(
  "/:id",
  MentorController.checkExistingMentor,
  MentorController.getMentor
);

router.post(
  "/",
  MentorController.validateMentorData,
  MentorController.createMentor
);

router.post(
  "/entermarks/:id",
  protectAuthForMentor,
  MentorController.updateMarksOfExistingStudent
);

// here the id is the mentor id
router.get(
  "/students/:id",
  protectAuthForMentor,
  MentorController.studentsUnderMentor
);

router.put(
  "/:id",
  protectAuthForMentor,
  MentorController.checkExistingMentor,
  MentorController.updateMentor
);

router.delete(
  "/:id",
  protectAuthForMentor,
  MentorController.checkExistingMentor,
  MentorController.deleteMentor
);

export default router;
