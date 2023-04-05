import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@sanngetickets/common";

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("must be a valid Email."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field is required."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Crendentials");
    }

    const matchPassword = await Password.compare(
      existingUser.password,
      password
    );

    if (!matchPassword) {
      throw new BadRequestError("Invalid Crendentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    res.status(200).send({ user: existingUser, userJwt: userJwt });
  }
);

export { router as signInRouter };
