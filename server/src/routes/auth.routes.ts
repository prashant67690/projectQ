import express from "express";
import * as MentorService from "../services/mentor.service";
import * as StudentController from "../controllers/student.controller";
import * as AuthController from "../controllers/auth.controller";
import {
  protectAuth,
  protectAuthForMentor,
} from "../middleware/authMiddleware";
import { LoginType, mentorSchema, userSchema } from "../types/zod";
import { NextFunction, Request, Response } from "express";
import {
  sendSuccessNoDataResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse,
  sendBadRequestResponse,
} from "../utils/responseHandler";
import { comparePasswords } from "../utils/bcryptHandler";
import { generateToken, verifyToken } from "../utils/jwtHandler";

const router = express.Router();
// Access : public
// POST : login
// Params body : email , password

// login route for the Students
router.post(
  "/login",
  AuthController.validateLoginData,
  StudentController.checkExistingStudentByEmail,
  AuthController.login
);

// logout route for student
router.post("/logout", protectAuth, AuthController.logout);

// <------------------------------------------Mentor Routes for authentication ------------------------------>

// login route for the Mentor
router.post(
  "/mentor/login",
  AuthController.validateMentorLoginData,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userRequest: LoginType = request.body;
      const user = await MentorService.getMentorByEmail(userRequest.email);
      if (!user) {
        return sendUnauthorizedResponse(response, "Credentials Error");
      }

      const passwordCompare = await comparePasswords(
        userRequest.password,
        user.password
      );

      if (passwordCompare) {
        const myID = "" + user.id;
        const token = generateToken({ id: myID }, "30d");

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

        return sendSuccessResponse(response, responseData);
      } else {
        return sendUnauthorizedResponse(response, "Credentials Error");
      }
    } catch (error: any) {
      next(error);
    }
  }
);

// logout route for mentor
router.post(
  "/mentor/logout",
  protectAuthForMentor,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      response.cookie("tokenm", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      request.mentor = undefined;

      return sendSuccessNoDataResponse(response, "Logout Successful");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
