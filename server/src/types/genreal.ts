import { Student, Mentor, Project } from "@prisma/client";

// types for the student data
export type CreateStudentType = Omit<Student, "id" | "marks" | "mentorId">;
export type updateStudentType = Omit<Student, "id" | "marks" | "mentorId">;

// types for the mentor data

export type CreateMentorType = Omit<Mentor, "id">;
export type updateMentorType = Omit<Mentor, "id" | "deparment">;

//  types for the Project data

export type CreateProjectType = Omit<Project, "id">;
export type updateProjectType = Omit<Project, "id">;
