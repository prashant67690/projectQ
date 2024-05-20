import { z } from "zod";

// student Schema

const departmentSchema = z.enum(["CSE", "IT", "CCE"]);

// student schemas

export const studentCreateSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "username must be at least 1 characters long" })
    .max(50, {
      message: "username cannot be longer than 50 characters",
    }),
  firstname: z
    .string()
    .min(1, { message: "Your first name must be at least 1 characters long" })
    .max(30, {
      message: "your first name cannot be longer than 30 characters",
    }),
  lastname: z
    .string()
    .min(1, { message: "Your last name must be at least 1 characters long" })
    .max(30, {
      message: "your last name cannot be longer than 30 characters",
    }),
  password: z.string(),
  department: departmentSchema,
});

export const studentUpdateSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Your first name must be at least 1 characters long" })
    .max(30, {
      message: "your first name cannot be longer than 30 characters",
    }),
  lastname: z
    .string()
    .min(1, { message: "Your last name must be at least 1 characters long" })
    .max(30, {
      message: "your last name cannot be longer than 30 characters",
    }),
  department: departmentSchema,
});

//  Teacher Schemas

export const mentorUpdateSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "firstname must be at least 1 characters long" })
    .max(50, {
      message: "firstname cannot be longer than 50 characters",
    }),
  lastname: z
    .string()
    .min(1, { message: "lastname must be at least 1 characters long" })
    .max(50, {
      message: "lastname cannot be longer than 50 characters",
    }),
  password: z
    .string()
    .min(1, { message: "password must be at least 1 characters long" })
    .max(50, {
      message: "password cannot be longer than 50 characters",
    }),
  department: departmentSchema,
  email: z
    .string()
    .email()
    .min(1, { message: "password must be at least 1 characters long" })
    .max(50, {
      message: "password cannot be longer than 50 characters",
    }),
});

export const mentorCreateSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "username must be at least 1 characters long" })
    .max(50, {
      message: "username cannot be longer than 50 characters",
    }),
  firstname: z
    .string()
    .min(1, { message: "Your first name must be at least 1 characters long" })
    .max(30, {
      message: "your first name cannot be longer than 30 characters",
    }),
  lastname: z
    .string()
    .min(1, { message: "Your last name must be at least 1 characters long" })
    .max(30, {
      message: "your last name cannot be longer than 30 characters",
    }),
  password: z.string(),
  department: departmentSchema,
});
// User Schema  Login

const userBaseSchema = {
  email: z
    .string()
    .email()
    .min(1, { message: "username must be at least 1 characters long" })
    .max(50, {
      message: "username cannot be longer than 50 characters",
    }),
  password: z
    .string()
    .min(1, { message: "password must be at least 1 characters long" })
    .max(50, {
      message: "password cannot be longer than 50 characters",
    }),
};

const mentorBaseSchema = {
  email: z
    .string()
    .email()
    .min(1, { message: "username must be at least 1 characters long" })
    .max(50, {
      message: "username cannot be longer than 50 characters",
    }),
  password: z
    .string()
    .min(1, { message: "password must be at least 1 characters long" })
    .max(50, {
      message: "password cannot be longer than 50 characters",
    }),
};

export const userSchema = z.object(userBaseSchema);
export const mentorSchema = z.object(mentorBaseSchema);

// <------------------------------------typescript Types --------------------------------------------->
// user type for input

export type Usertype = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  department: string;
  marks: number | undefined | null;
  mentorId: number | undefined | null;
};

export type Mentortype = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  department: string;
};

export type LoginType = {
  email: string;
  password: string;
};

//   Export Types by using type inference

export type TStudentSchema = z.infer<typeof userSchema>;
