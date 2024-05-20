import { db } from "../utils/db.server";
import { CreateMentorType, updateMentorType } from "../types/genreal";

export const listMentor = async () => {
  return db.mentor.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      department: true,
    },
  });
};

export const detailsMentor = async (id: number) => {
  return db.mentor.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      department: true,
    },
  });
};

export const getMentor = async (id: number) => {
  return db.mentor.findFirst({
    where: {
      id: id,
    },
  });
};

export const getMentorByEmail = async (email: string) => {
  return db.mentor.findUnique({
    where: {
      email: email,
    },
  });
};

export const getMentorByID = async (id: string) => {
  const newid: number = Number.parseInt(id, 10);
  return db.mentor.findUnique({
    where: {
      id: newid,
    },
  });
};

// this is for creation of the student in the server

export const createMentor = async (mentorDetails: CreateMentorType) => {
  const { firstname, lastname, email, password, department } = mentorDetails;
  return db.mentor.create({
    data: {
      email,
      firstname,
      lastname,
      password,
      department,
    },
  });
};

export const updateMentor = async (mentor: updateMentorType, id: number) => {
  const { email, firstname, lastname, password, department } = mentor;
  return db.mentor.update({
    where: {
      id: id,
    },
    data: {
      email,
      firstname,
      lastname,
      password,
      department,
    },
  });
};

export const deleteMentor = async (id: number): Promise<void> => {
  await db.mentor.delete({
    where: {
      id: id,
    },
  });
};
