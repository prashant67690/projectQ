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
const authMiddleware_1 = require("../middleware/authMiddleware");
const StudentController = __importStar(require("../controllers/student.controller"));
const router = express_1.default.Router();
// Acess : Public
// GET : Get List of all authors
router.get("/", StudentController.listStudent);
router.get("/me", authMiddleware_1.protectAuth, StudentController.detailsStudent);
// Acess : Public
// GET : Get One Student by ID
// Params query : id
router.get("/:id", StudentController.checkExistingStudent, StudentController.getStudent);
// Acess : public
// POST : Create one Student Account
router.post("/", StudentController.validateStudentData, StudentController.createStudent);
// Acess : Private
// PUT : update a Student
// Params query : id
// Params body : firstName , lastName
router.put("/:id", authMiddleware_1.protectAuth, StudentController.checkExistingStudent, StudentController.updateStudent);
// Acess : Private
// DELETE : delete a Student
// Params query : id
router.delete("/:id", authMiddleware_1.protectAuth, StudentController.checkExistingStudent, StudentController.deleteStudent);
// mentor assign route
router.post("/assign/:id", authMiddleware_1.protectAuth, StudentController.assignMentor);
exports.default = router;
