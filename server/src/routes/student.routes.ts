import express from "express";
import { protectAuth } from "../middleware/authMiddleware";
import * as StudentController from "../controllers/student.controller";

const router = express.Router();

// Acess : Public
// GET : Get List of all authors
router.get("/", StudentController.listStudent);

router.get("/me", protectAuth, StudentController.detailsStudent);

// Acess : Public
// GET : Get One Student by ID
// Params query : id
router.get(
  "/:id",
  StudentController.checkExistingStudent,
  StudentController.getStudent
);

// Acess : public
// POST : Create one Student Account
router.post(
  "/",
  StudentController.validateStudentData,
  StudentController.createStudent
);

// Acess : Private
// PUT : update a Student
// Params query : id
// Params body : firstName , lastName
router.put(
  "/:id",
  protectAuth,
  StudentController.checkExistingStudent,
  StudentController.updateStudent
);

// Acess : Private
// DELETE : delete a Student
// Params query : id
router.delete(
  "/:id",
  protectAuth,
  StudentController.checkExistingStudent,
  StudentController.deleteStudent
);

// mentor assign route
router.post("/assign/:id", protectAuth, StudentController.assignMentor);

export default router;
