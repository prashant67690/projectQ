import * as StudentService from "../services/student.service";
import * as MentorService from "../services/mentor.service";
import { NextFunction, Response, Request } from "express";
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendForbiddenResponse,
} from "../utils/responseHandler";
import { verifyToken } from "../utils/jwtHandler";

const protectAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const allCookies = request.cookies;
  console.log(allCookies.token);
  const token = allCookies.token;
  if (token) {
    console.log("hit");
    try {
      const decoded = verifyToken(token);
      console.log(decoded);
      const authUser = await StudentService.getStudentByID(decoded.id);
      if (authUser?.email) {
        request.user = authUser;
      }

      next();
    } catch (error: any) {
      console.log("protectAuth error");
      next(error);
    }
  } else {
    return sendBadRequestResponse(response, "Unauthorized - you need to login");
  }
};

const protectAuthForMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const allCookies = request.cookies;
  const token = allCookies.tokenm;
  console.log("hit");
  console.log(allCookies);
  if (token) {
    try {
      const decoded = verifyToken(token);
      console.log(decoded);
      const authUser = await MentorService.getMentorByID(decoded.id);
      if (authUser?.email) {
        request.mentor = authUser;
      }
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    return sendBadRequestResponse(response, "Unauthorized - you need to login");
  }
};

export const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.cookies["jwt"];
    if (token === "") {
      sendForbiddenResponse(response);
    } else {
      next();
    }
  } catch (error: any) {
    next(error);
  }
};

const authorizeAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const allCookies = request.cookies;
  console.log(allCookies.admin);
  const token = allCookies.admin;
  if (token) {
    console.log("hit");
    try {
      const decoded = verifyToken(token);
      console.log(decoded);

      if (decoded.id === process.env.ADMIN_EMAIL) {
        next();
      }
    } catch (error: any) {
      console.log("protectAuth error");
      next(error);
    }
  } else {
    return sendBadRequestResponse(response, "Unauthorized - you need to login");
  }
};

export { protectAuth, protectAuthForMentor, authorizeAdmin };
