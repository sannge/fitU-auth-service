import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@sanngetickets/common";
import { checkAuthorization } from "../middlewares/check-authorization";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/resetpassword",
  [
    body("email").isEmail().withMessage("must be a valid Email."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field is required."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Crendentials");
    }

    if (password !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }

    existingUser.set({
      password,
    });

    await existingUser.save();

    res.status(200).send({ user: existingUser });
  }
);

export { router as resetPasswordRouter };
