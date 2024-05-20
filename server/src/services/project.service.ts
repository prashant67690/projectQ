import { db } from "../utils/db.server";
import { uploadFile, deleteFile } from "../utils/google";

export const detailsProject = async (inputid: number) => {
  return db.project.findFirst({
    where: {
      studentId: inputid,
    },
  });
};

export const createProject = async (title: string, id: number) => {
  return await db.project.create({
    data: {
      title,
      studentId: id,
    },
  });
};

// Updating the Poject details

export const updateProjectTitle = async (title: string, id: number) => {
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      title,
    },
  });
};

export const updateProjectSynopsis = async (
  synopsis: Express.Multer.File,
  id: number
) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (existingFile?.synopsis != undefined || existingFile?.synopsis != null) {
    const fileId = existingFile.synopsis;
    await deleteFile(fileId);
  }
  const data = await uploadFile(synopsis);
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      synopsis: data.id,
    },
  });
};

export const updateProjectJoiningReport = async (
  report: Express.Multer.File,
  id: number
) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (
    existingFile?.joiningReport != undefined ||
    existingFile?.joiningReport != null
  ) {
    const fileId = existingFile.joiningReport;
    await deleteFile(fileId);
  }
  const data = await uploadFile(report);
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      joiningReport: data.id,
    },
  });
};

export const updateProjectCertificate = async (
  certificate: Express.Multer.File,
  id: number
) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (
    existingFile?.completionCertificate != undefined ||
    existingFile?.completionCertificate != null
  ) {
    const fileId = existingFile.completionCertificate;
    await deleteFile(fileId);
  }

  const data = await uploadFile(certificate);
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      completionCertificate: data.id,
    },
  });
};

export const updateSlot = async (slot: string, id: number) => {
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      slot,
    },
  });
};

export const updateMidTermPresentation = async (
  presentation: Express.Multer.File,
  id: number
) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (existingFile?.midterm != undefined || existingFile?.midterm != null) {
    const fileId = existingFile.midterm;
    await deleteFile(fileId);
  }

  const data = await uploadFile(presentation);
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      midterm: data.id,
    },
  });
};

export const updateEndTermPresentation = async (
  presentation: Express.Multer.File,
  id: number
) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (existingFile?.endterm != undefined || existingFile?.endterm != null) {
    const fileId = existingFile.endterm;
    await deleteFile(fileId);
  }

  const data = await uploadFile(presentation);
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      endterm: data.id,
    },
  });
};

export const updateEndTermReport = async (
  report: Express.Multer.File,
  id: number
) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (
    existingFile?.endtermreport != undefined ||
    existingFile?.endtermreport != null
  ) {
    const fileId = existingFile.endtermreport;
    await deleteFile(fileId);
  }

  const data = await uploadFile(report);
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      endtermreport: data.id,
    },
  });
};

export const updateEndTermMarks = async (marks: number, id: number) => {
  console.log("hit the service ");
  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      endtermmarks: marks,
    },
  });
};

// setting the files Null services

export const SetSynopsisNull = async (id: number) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (existingFile?.synopsis != undefined || existingFile?.synopsis != null) {
    const fileId = existingFile.synopsis;
    await deleteFile(fileId);
  }

  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      synopsis: null,
    },
  });
};

export const SetReportNull = async (id: number) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (
    existingFile?.joiningReport != undefined ||
    existingFile?.joiningReport != null
  ) {
    const fileId = existingFile.joiningReport;
    await deleteFile(fileId);
  }

  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      joiningReport: null,
    },
  });
};

export const SetCertificateNull = async (id: number) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (
    existingFile?.completionCertificate != undefined ||
    existingFile?.completionCertificate != null
  ) {
    const fileId = existingFile.completionCertificate;
    await deleteFile(fileId);
  }

  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      completionCertificate: null,
    },
  });
};

export const SetMidTermPresentationNull = async (id: number) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (existingFile?.midterm != undefined || existingFile?.midterm != null) {
    const fileId = existingFile.midterm;
    await deleteFile(fileId);
  }

  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      midterm: null,
    },
  });
};

export const SetEndTermPresentationNull = async (id: number) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (existingFile?.endterm != undefined || existingFile?.endterm != null) {
    const fileId = existingFile.endterm;
    await deleteFile(fileId);
  }

  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      endterm: null,
    },
  });
};

export const SetEndTermReportNull = async (id: number) => {
  const existingFile = await db.project.findFirst({
    where: {
      studentId: id,
    },
  });

  if (
    existingFile?.endtermreport != undefined ||
    existingFile?.endtermreport != null
  ) {
    const fileId = existingFile.endtermreport;
    await deleteFile(fileId);
  }

  return await db.project.update({
    where: {
      studentId: id,
    },
    data: {
      endtermreport: null,
    },
  });
};
