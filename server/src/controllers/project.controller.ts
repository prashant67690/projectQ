import HttpStatusCode from "../utils/HttpStatusCode";
import * as ProjectService from "../services/project.service";
import { NextFunction, Request, Response } from "express";
import fs from "fs";

import {
  sendErrorResponse,
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
  sendValidationError,
} from "../utils/responseHandler";
import { getFile, deleteFile } from "../utils/google";
import { file } from "googleapis/build/src/apis/file";

export const detailsProject = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      return sendSuccessResponse(response, details);
    }
  } catch (error: any) {
    next(error);
  }
};

export const detailsProjectById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    const details = await ProjectService.detailsProject(id);
    return sendSuccessResponse(response, details);
  } catch (error: any) {
    next(error);
  }
};

export const createProject = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const { title } = request.body;

      const details = await ProjectService.createProject(
        title,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error: any) {
    next(error);
  }
};

// <---------------------------------Update  Controllers ------------------------------------->

export const updateProjectTitle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const { title } = request.body;

      const details = await ProjectService.updateProjectTitle(
        title,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateProjectSynopsis = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const synopsis = request.file;

      if (!synopsis) {
        return sendNotFoundResponse(
          response,
          "File not Found",
          HttpStatusCode.NOT_FOUND
        );
      }
      const details = await ProjectService.updateProjectSynopsis(
        synopsis,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateProjectJoiningReport = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const joiningReport = request.file;

      if (!joiningReport) {
        return sendNotFoundResponse(
          response,
          "File not Found",
          HttpStatusCode.NOT_FOUND
        );
      }
      const details = await ProjectService.updateProjectJoiningReport(
        joiningReport,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateProjectCertificate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const certificate = request.file;

      if (!certificate) {
        return sendNotFoundResponse(
          response,
          "File not Found",
          HttpStatusCode.NOT_FOUND
        );
      }
      const details = await ProjectService.updateProjectCertificate(
        certificate,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateSlot = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const { slot } = request.body;
      if (slot == "") {
        return sendNotFoundResponse(response, {
          message: "There exits no data regarding the slot details",
        });
      } else {
        const res = await ProjectService.updateSlot(slot, request.user.id);
        return sendSuccessResponse(response, res, HttpStatusCode.OK);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const updateMidTermPresentation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const presentation = request.file;
      if (!presentation) {
        return sendNotFoundResponse(
          response,
          "File not Found",
          HttpStatusCode.NOT_FOUND
        );
      }
      const details = await ProjectService.updateMidTermPresentation(
        presentation,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error) {
    next(error);
  }
};

export const updateEndTermPresentation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const presentation = request.file;
      if (!presentation) {
        return sendNotFoundResponse(
          response,
          "File not Found",
          HttpStatusCode.NOT_FOUND
        );
      }
      const details = await ProjectService.updateEndTermPresentation(
        presentation,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error) {
    next(error);
  }
};

export const updateEndTermReport = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const report = request.file;
      if (!report) {
        return sendNotFoundResponse(
          response,
          "File not Found",
          HttpStatusCode.NOT_FOUND
        );
      }
      const details = await ProjectService.updateEndTermReport(
        report,
        request.user.id
      );
      return sendSuccessResponse(response, details);
    }
  } catch (error) {
    next(error);
  }
};

export const updateEndTermMarks = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.mentor == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const marks = parseInt(request.body.marks);
      const id = parseInt(request.params.id);
      if (marks == 0) {
        return sendNotFoundResponse(response, {
          message: "There exits no data regarding the slot details",
        });
      } else {
        const res = await ProjectService.updateEndTermMarks(marks, id);
        return sendSuccessResponse(response, res, HttpStatusCode.OK);
      }
    }
  } catch (error) {
    next(error);
  }
};

// <---------------------------------download Controllers ------------------------------------->

export const downloadSynopsis = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.synopsis != null) {
        const fileId = details.synopsis;
        const downloadUrl = `https://drive.google.com/uc?id=${fileId}`;
        response.redirect(downloadUrl);
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const downloadJoiningReport = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.joiningReport != null) {
        const fileId = details.joiningReport;
        const downloadUrl = `https://drive.google.com/uc?id=${fileId}`;
        response.status(200).json({ url: downloadUrl });
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const downloadCertificate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.completionCertificate != null) {
        const fileId = details.completionCertificate;
        const downloadUrl = `https://drive.google.com/uc?id=${fileId}`;
        response.redirect(downloadUrl);
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getNameOfFile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const fileId = request.params.id;
      const result = await getFile(fileId);
      return sendSuccessResponse(response, { name: result }, HttpStatusCode.OK);
    }
  } catch (error) {
    next(error);
  }
};

// <---------------------------------Delete Controllers for The files ------------------------------------->

export const deleteSynopsis = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.synopsis != null) {
        await ProjectService.SetSynopsisNull(request.user.id);
        return sendSuccessNoDataResponse(
          response,
          "Sucess fully deleted",
          HttpStatusCode.OK
        );
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteJoiningReport = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.joiningReport != null) {
        await ProjectService.SetReportNull(request.user.id);
        return sendSuccessNoDataResponse(
          response,
          "Sucess fully deleted",
          HttpStatusCode.OK
        );
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCertificate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.completionCertificate != null) {
        await ProjectService.SetCertificateNull(request.user.id);
        return sendSuccessNoDataResponse(
          response,
          "Sucess fully deleted",
          HttpStatusCode.OK
        );
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteMidTermPresentation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.midterm != null) {
        await ProjectService.SetMidTermPresentationNull(request.user.id);
        return sendSuccessNoDataResponse(
          response,
          "Sucess fully deleted",
          HttpStatusCode.OK
        );
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteEndTermPresentation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.endterm != null) {
        await ProjectService.SetEndTermPresentationNull(request.user.id);
        return sendSuccessNoDataResponse(
          response,
          "Sucess fully deleted",
          HttpStatusCode.OK
        );
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteEndTermReport = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.user == undefined) {
      return sendErrorResponse(
        response,
        "There is authentication issue please login correctly with the correct user",
        HttpStatusCode.FORBIDDEN
      );
    } else {
      const details = await ProjectService.detailsProject(request.user.id);
      if (details != null && details.endtermreport != null) {
        await ProjectService.SetEndTermReportNull(request.user.id);
        return sendSuccessNoDataResponse(
          response,
          "Sucess fully deleted",
          HttpStatusCode.OK
        );
      } else {
        return sendNotFoundResponse(
          response,
          "There was no data found for the user",
          HttpStatusCode.NOT_FOUND
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
