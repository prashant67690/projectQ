import { db } from "../utils/db.server";
import { CreateStudentType, updateStudentType } from "../types/genreal";

export const listStudent = async () => {
  return db.student.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      department: true,
      marks: true,
      mentorId: true,
    },
  });
};

export const detailsStudent = async (id: number) => {
  return db.student.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      department: true,
      marks: true,
      password: true,
      mentorId: true,
    },
  });
};

export const getStudent = async (id: number) => {
  return db.student.findUnique({
    where: {
      id: id,
    },
  });
};

export const getStudentByID = async (id: string) => {
  const newid: number = Number.parseInt(id, 10);
  return db.student.findUnique({
    where: {
      id: newid,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  console.log(email);
  return db.student.findUnique({
    where: {
      email: email,
    },
  });
};

// this is for creation of the student in the server

export const createStudent = async (studentDetails: CreateStudentType) => {
  const { firstname, lastname, email, password, department } = studentDetails;
  return db.student.create({
    data: {
      email,
      firstname,
      lastname,
      password,
      department,
    },
  });
};

export const updateStudentDetails = async (
  student: updateStudentType,
  id: number
) => {
  const { email, firstname, lastname, password, department } = student;
  return await db.student.update({
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

export const deleteStudent = async (id: number): Promise<void> => {
  await db.student.delete({
    where: {
      id: id,
    },
  });
};

export const countMentor = async (mentorId: number) => {
  const studentCount = await db.student.findMany({
    where: {
      mentorId: mentorId,
    },
  });
  return studentCount.length;
};

export const updateStudentMentor = async (id: number, mentorId: number) => {
  return await db.student.update({
    where: {
      id: id,
    },
    data: {
      mentorId: mentorId,
    },
  });
};

export const updateMarks = async (id: number, marks: number) => {
  return await db.student.update({
    where: {
      id: id,
    },
    data: {
      marks: marks,
    },
  });
};

export const studentUnderMentor = async (mentorid: number) => {
  return await db.student.findMany({
    where: {
      mentorId: mentorid,
    },
  });
};
