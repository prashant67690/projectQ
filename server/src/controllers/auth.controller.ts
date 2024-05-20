import * as StudentService from "../services/student.service";
import { NextFunction, Request, Response } from "express";
import { LoginType, mentorSchema, userSchema } from "../types/zod";
import {
  sendSuccessNoDataResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse,
} from "../utils/responseHandler";
import { comparePasswords } from "../utils/bcryptHandler";
import { generateToken } from "../utils/jwtHandler";

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userRequest: LoginType = request.body;
    const user = await StudentService.getUserByEmail(userRequest.email);
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

      response.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const responseData = {
        id: user.id,
        name: user.firstname + " " + user.lastname,
        email: user.email,
        marks: user.marks,
        mentorId: user.mentorId,
      };

      return sendSuccessResponse(response, responseData);
    } else {
      return sendUnauthorizedResponse(response, "Credentials Error");
    }
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    request.user = undefined;

    return sendSuccessNoDataResponse(response, "Logout Successful");
  } catch (error) {
    next(error);
  }
};

// Middlewares ________________________

export const validateLoginData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = request.body;
    userSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateMentorLoginData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = request.body;
    mentorSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};
