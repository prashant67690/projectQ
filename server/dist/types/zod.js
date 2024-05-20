"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentorSchema = exports.userSchema = exports.mentorCreateSchema = exports.mentorUpdateSchema = exports.studentUpdateSchema = exports.studentCreateSchema = void 0;
const zod_1 = require("zod");
// student Schema
const departmentSchema = zod_1.z.enum(["CSE", "IT", "CCE"]);
// student schemas
exports.studentCreateSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email()
        .min(1, { message: "username must be at least 1 characters long" })
        .max(50, {
        message: "username cannot be longer than 50 characters",
    }),
    firstname: zod_1.z
        .string()
        .min(1, { message: "Your first name must be at least 1 characters long" })
        .max(30, {
        message: "your first name cannot be longer than 30 characters",
    }),
    lastname: zod_1.z
        .string()
        .min(1, { message: "Your last name must be at least 1 characters long" })
        .max(30, {
        message: "your last name cannot be longer than 30 characters",
    }),
    password: zod_1.z.string(),
    department: departmentSchema,
});
exports.studentUpdateSchema = zod_1.z.object({
    firstname: zod_1.z
        .string()
        .min(1, { message: "Your first name must be at least 1 characters long" })
        .max(30, {
        message: "your first name cannot be longer than 30 characters",
    }),
    lastname: zod_1.z
        .string()
        .min(1, { message: "Your last name must be at least 1 characters long" })
        .max(30, {
        message: "your last name cannot be longer than 30 characters",
    }),
    department: departmentSchema,
});
//  Teacher Schemas
exports.mentorUpdateSchema = zod_1.z.object({
    firstname: zod_1.z
        .string()
        .min(1, { message: "firstname must be at least 1 characters long" })
        .max(50, {
        message: "firstname cannot be longer than 50 characters",
    }),
    lastname: zod_1.z
        .string()
        .min(1, { message: "lastname must be at least 1 characters long" })
        .max(50, {
        message: "lastname cannot be longer than 50 characters",
    }),
    password: zod_1.z
        .string()
        .min(1, { message: "password must be at least 1 characters long" })
        .max(50, {
        message: "password cannot be longer than 50 characters",
    }),
    department: departmentSchema,
    email: zod_1.z
        .string()
        .email()
        .min(1, { message: "password must be at least 1 characters long" })
        .max(50, {
        message: "password cannot be longer than 50 characters",
    }),
});
exports.mentorCreateSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email()
        .min(1, { message: "username must be at least 1 characters long" })
        .max(50, {
        message: "username cannot be longer than 50 characters",
    }),
    firstname: zod_1.z
        .string()
        .min(1, { message: "Your first name must be at least 1 characters long" })
        .max(30, {
        message: "your first name cannot be longer than 30 characters",
    }),
    lastname: zod_1.z
        .string()
        .min(1, { message: "Your last name must be at least 1 characters long" })
        .max(30, {
        message: "your last name cannot be longer than 30 characters",
    }),
    password: zod_1.z.string(),
    department: departmentSchema,
});
// User Schema  Login
const userBaseSchema = {
    email: zod_1.z
        .string()
        .email()
        .min(1, { message: "username must be at least 1 characters long" })
        .max(50, {
        message: "username cannot be longer than 50 characters",
    }),
    password: zod_1.z
        .string()
        .min(1, { message: "password must be at least 1 characters long" })
        .max(50, {
        message: "password cannot be longer than 50 characters",
    }),
};
const mentorBaseSchema = {
    email: zod_1.z
        .string()
        .email()
        .min(1, { message: "username must be at least 1 characters long" })
        .max(50, {
        message: "username cannot be longer than 50 characters",
    }),
    password: zod_1.z
        .string()
        .min(1, { message: "password must be at least 1 characters long" })
        .max(50, {
        message: "password cannot be longer than 50 characters",
    }),
};
exports.userSchema = zod_1.z.object(userBaseSchema);
exports.mentorSchema = zod_1.z.object(mentorBaseSchema);
