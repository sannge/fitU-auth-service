import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cors from "cors";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { currentUserRouter } from "./routes/current-user";
import { resetPasswordRouter } from "./routes/reset-password";
import { errorHandler, NotFoundError } from "@sanngetickets/common";

const app = express();
app.use(cors());
app.use(json());

app.use(signInRouter);
app.use(signUpRouter);
app.use(currentUserRouter);
app.use(resetPasswordRouter);

app.all("/users", async (req, res) => {
  res.json({ message: "Hi!" });
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
