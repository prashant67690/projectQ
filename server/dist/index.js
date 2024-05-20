"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
//  files imports
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const mentor_routes_1 = __importDefault(require("./routes/mentor.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const notFound_1 = require("./middleware/notFound");
const errorHandler_1 = require("./middleware/errorHandler");
dotenv.config({
    path: "../.env",
});
const app = (0, express_1.default)();
// using the middlewares to stup the backend
const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.get("/", (req, res) => {
    res.send("<h1>The server has been started </h1>");
});
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const transporter = nodemailer_1.default.createTransport({
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
app.use("/api/student", student_routes_1.default);
app.use("/api/mentor", mentor_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/project", project_routes_1.default);
// end fo routes
// route not found handler not found
app.use(notFound_1.notFoundHandler);
// global error handler middleware
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Listing on the port ${PORT}`);
});
