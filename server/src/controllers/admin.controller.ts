import HttpStatusCode from "../utils/HttpStatusCode";
import * as ProjectService from "../services/project.service";
import * as StudentService from "../services/student.service";
import { NextFunction, Request, Response } from "express";
import { db } from "../utils/db.server";

import {
  sendBadRequestResponse,
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";

export const getProject = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    const details = await ProjectService.detailsProject(id);
    return sendSuccessResponse(response, details, HttpStatusCode.OK);
  } catch (error: any) {
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

export const lockMarks = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const lock = request.body.lock;
    const data = await db.admin.update({
      where: {
        id: 1,
      },
      data: {
        lock: lock,
      },
    });
    return sendSuccessResponse(response, data, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

export const viewMarks = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const lock = parseInt(request.body.lock);

    const res = await db.admin.findFirst({ where: { id: 1 } });

    return sendSuccessResponse(response, res, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};
