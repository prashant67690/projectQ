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
const express_1 = __importDefault(require("express"));
const MentorService = __importStar(require("../services/mentor.service"));
const StudentController = __importStar(require("../controllers/student.controller"));
const AuthController = __importStar(require("../controllers/auth.controller"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const responseHandler_1 = require("../utils/responseHandler");
const bcryptHandler_1 = require("../utils/bcryptHandler");
const jwtHandler_1 = require("../utils/jwtHandler");
const router = express_1.default.Router();
// Access : public
// POST : login
// Params body : email , password
// login route for the Students
router.post("/login", AuthController.validateLoginData, StudentController.checkExistingStudentByEmail, AuthController.login);
// logout route for student
router.post("/logout", authMiddleware_1.protectAuth, AuthController.logout);
// <------------------------------------------Mentor Routes for authentication ------------------------------>
// login route for the Mentor
router.post("/mentor/login", AuthController.validateMentorLoginData, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRequest = request.body;
        const user = yield MentorService.getMentorByEmail(userRequest.email);
        if (!user) {
            return (0, responseHandler_1.sendUnauthorizedResponse)(response, "Credentials Error");
        }
        const passwordCompare = yield (0, bcryptHandler_1.comparePasswords)(userRequest.password, user.password);
        if (passwordCompare) {
            const myID = "" + user.id;
            const token = (0, jwtHandler_1.generateToken)({ id: myID }, "30d");
            response.cookie("tokenm", token, {
                httpOnly: true,
                secure: process.env.APP_ENV !== "developement",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            request.mentor = user;
            const responseData = {
                id: user.id,
                name: user.firstname + " " + user.lastname,
                email: user.email,
                department: user.department,
            };
            return (0, responseHandler_1.sendSuccessResponse)(response, responseData);
        }
        else {
            return (0, responseHandler_1.sendUnauthorizedResponse)(response, "Credentials Error");
        }
    }
    catch (error) {
        next(error);
    }
}));
// logout route for mentor
router.post("/mentor/logout", authMiddleware_1.protectAuthForMentor, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        response.cookie("tokenm", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        request.mentor = undefined;
        return (0, responseHandler_1.sendSuccessNoDataResponse)(response, "Logout Successful");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
