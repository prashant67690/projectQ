import { Usertype, Mentortype } from "./zod";

declare module "express" {
  interface Request {
    user?: Usertype;
    mentor?: Mentortype;
  }
}
