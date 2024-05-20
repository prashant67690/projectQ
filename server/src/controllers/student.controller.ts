import HttpStatusCode from "../utils/HttpStatusCode";
import * as StudentService from "../services/student.service";
import * as MentorService from "../services/mentor.service";
import { NextFunction, Request, Response } from "express";
import { studentCreateSchema } from "../types/zod";
import { CreateStudentType, updateStudentType } from "../types/genreal";

import {
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
  sendValidationError,
} from "../utils/responseHandler";

export const listStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const students = await StudentService.listStudent();
    return sendSuccessResponse(response, students);
  } catch (error: any) {
    next(error);
  }
};

export const detailsStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user != undefined) {
      const students = await StudentService.detailsStudent(request.user.id);
      return sendSuccessResponse(response, students);
    } else {
      throw Error("Undefined issue");
    }
  } catch (error: any) {
    next(error);
  }
};

export const getStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    const author = await StudentService.getStudent(id);
    return sendSuccessResponse(response, author);
  } catch (error: any) {
    next(error);
  }
};

export const createStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const author: CreateStudentType = request.body;
    const newAuthor = await StudentService.createStudent(author);
    return sendSuccessResponse(response, newAuthor, HttpStatusCode.CREATED);
  } catch (error: any) {
    next(error);
  }
};

export const updateStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    const author: updateStudentType = request.body;
    const updatedAuthor = await StudentService.updateStudentDetails(author, id);
    return sendSuccessResponse(response, updatedAuthor);
  } catch (error: any) {
    next(error);
  }
};

export const deleteStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    await StudentService.deleteStudent(id);
    return sendSuccessNoDataResponse(response, "Author has been deleted");
  } catch (error: any) {
    next(error);
  }
};

export const assignMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendValidationError(
        response,
        "There is user autheentication error",
        [],
        HttpStatusCode.CONFLICT
      );
    }
    const id = parseInt(request.params.id, 10);
    const preferences: number[] = request.body;
    for (let i = 0; i < preferences.length; i++) {
      const num = await StudentService.countMentor(preferences[i]);
      if (num < 10) {
        const user = request.user;
        if (user != undefined) {
          const updatedData = await StudentService.updateStudentMentor(
            id,
            preferences[i]
          );
          return sendSuccessResponse(response, updatedData, HttpStatusCode.OK);
        } else {
          return sendValidationError(
            response,
            "There is user autheentication error",
            [],
            HttpStatusCode.CONFLICT
          );
        }
      } else {
        continue;
      }
    }

    const teachers = await MentorService.listMentor();
    const random = Math.floor(Math.random() * teachers.length);
    if (request.user == undefined) {
      return sendValidationError(
        response,
        "There is user autheentication error",
        [],
        HttpStatusCode.CONFLICT
      );
    }
    const updatedData = await StudentService.updateStudentMentor(
      request.user.id,
      preferences[random]
    );
    return sendSuccessResponse(response, updatedData, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

// <-----------------------------------Pre Check Functions ---------------------------------------------------->

// some controller functions for pre checks
export const checkExistingStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    const student = await StudentService.getStudent(id);
    if (!student) {
      return sendNotFoundResponse(response, "Student Not Found");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const checkExistingStudentByEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const email = request.body.email;
    const student = await StudentService.getUserByEmail(email);
    console.log(student);
    if (!student) {
      return sendNotFoundResponse(response, "Student Not Found");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateStudentData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const student: CreateStudentType = request.body; // this particular body contains only first name and lastname and other user credentials
    studentCreateSchema.parse(student);
    next();
  } catch (error) {
    next(error);
  }
};
