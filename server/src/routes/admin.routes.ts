import express from "express";
import { NextFunction, Request, Response } from "express";
import { authorizeAdmin } from "../middleware/authMiddleware";
import * as AdminController from "../controllers/admin.controller";
import * as MentorController from "../controllers/mentor.controller";
import {
  sendSuccessNoDataResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse,
} from "../utils/responseHandler";
import { comparePasswords } from "../utils/bcryptHandler";
import { generateToken } from "../utils/jwtHandler";

const router = express.Router();

router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userRequest = request.body;

      if (!userRequest.email || !userRequest.password) {
        return sendUnauthorizedResponse(response, "Credentials Error");
      }

      if (process.env.ADMIN_PASS == undefined) {
        return sendUnauthorizedResponse(response, "Credentials Error");
      }

      const passwordCompare = await comparePasswords(
        userRequest.password,
        process.env.ADMIN_PASS
      );

      if (passwordCompare && userRequest.email == process.env.ADMIN_EMAIL) {
        const myID = "" + userRequest.email;
        const token = generateToken({ id: myID }, "30d");

        response.cookie("admin", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        const responseData = {
          email: userRequest.email,
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

router.post(
  "/logout",
  authorizeAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      response.cookie("admin", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      return sendSuccessNoDataResponse(response, "Logout Successful");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/data", authorizeAdmin, MentorController.listMentor);

router.get(
  "/data/student/:id",
  authorizeAdmin,
  AdminController.studentsUnderMentor
);

router.get("/data/project/:id", authorizeAdmin, AdminController.getProject);

router.get("/lock", AdminController.viewMarks);

router.post("/lock", authorizeAdmin, AdminController.lockMarks);

export default router;
