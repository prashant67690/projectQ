import HttpStatusCode from "../utils/HttpStatusCode";
import * as MentorService from "../services/mentor.service";
import * as StudentService from "../services/student.service";
import { NextFunction, Request, Response } from "express";
import { mentorSchema } from "../types/zod";
import { CreateMentorType, updateMentorType } from "../types/genreal";
import {
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";

export const listMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = await MentorService.listMentor();
    return sendSuccessResponse(response, data);
  } catch (error: any) {
    next(error);
  }
};

export const getMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    const data = await MentorService.getMentor(id);
    return sendSuccessResponse(response, data);
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
      const students = await MentorService.detailsMentor(request.user.id);
      return sendSuccessResponse(response, students);
    } else {
      throw Error("Undefined issue");
    }
  } catch (error: any) {
    next(error);
  }
};

export const createMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const mentor: CreateMentorType = request.body;
    const data = await MentorService.createMentor(mentor);
    return sendSuccessResponse(response, data, HttpStatusCode.CREATED);
  } catch (error: any) {
    next(error);
  }
};

export const updateMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    const mentor: updateMentorType = request.body;
    const updateMentor = await MentorService.updateMentor(mentor, id);
    return sendSuccessResponse(response, updateMentor);
  } catch (error: any) {
    next(error);
  }
};

export const deleteMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    await MentorService.deleteMentor(id);
    return sendSuccessNoDataResponse(response, "Mentor has been deleted");
  } catch (error: any) {
    next(error);
  }
};

export const updateMarksOfExistingStudent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id, 10);
    const marks = parseInt(request.body.marks);
    const data = await StudentService.updateMarks(id, marks);
    if (!data) {
      return sendNotFoundResponse(response, "Student Not Found");
    }
    return sendSuccessResponse(response, data, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

export const studentsUnderMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    const data = await StudentService.studentUnderMentor(id);
    if (!data) {
      return sendNotFoundResponse(response, "Student Not Found");
    }
    return sendSuccessResponse(response, data, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

export const checkExistingMentor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const Id: number = parseInt(request.params.id);

    const existingMentor = await MentorService.getMentor(Id);

    if (!existingMentor) {
      return sendNotFoundResponse(response, "Mentor Not Found");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateMentorData = (
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
