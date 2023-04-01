"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const signin_1 = require("./routes/signin");
const signup_1 = require("./routes/signup");
const current_user_1 = require("./routes/current-user");
const reset_password_1 = require("./routes/reset-password");
const common_1 = require("@sanngetickets/common");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use(signin_1.signInRouter);
app.use(signup_1.signUpRouter);
app.use(current_user_1.currentUserRouter);
app.use(reset_password_1.resetPasswordRouter);
app.all("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Hi!" });
}));
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError();
}));
app.use(common_1.errorHandler);
