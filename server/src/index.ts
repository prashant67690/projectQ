import express, { response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import axios from "axios";

//  files imports
import studentRouter from "./routes/student.routes";
import mentorRouter from "./routes/mentor.routes";
import authRouter from "./routes/auth.routes";
import adminRouter from "./routes/admin.routes";
import projectRouter from "./routes/project.routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { downloadFile } from "../src/utils/google";

dotenv.config({
  path: "../.env",
});

const app = express();

// using the middlewares to stup the backend

const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.get("/", (req, res) => {
  res.send("<h1>The server has been started </h1>");
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "prashant67670@gmail.com",
    pass: "ehkirvfirhixguwn",
  },
});

app.post("/api/send", (req, res) => {
  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send("Email sent successfully");
  });
});

const PORT = process.env.PORT;

// Main routes for the application
app.use("/api/student", studentRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.use("/api/admin", adminRouter);
// end fo routes

// route not found handler not found
app.use(notFoundHandler);

// global error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listing on the port ${PORT}`);
});
