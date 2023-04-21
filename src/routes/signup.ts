import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest, BadRequestError } from "@sanngetickets/common";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("name").trim().notEmpty().withMessage("Name cannot be empty"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      goal,
      gender,
      bodyType,
      height,
      weight,
      dob,
      activityLevel,
      email,
      password,
      confirmPassword,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // if (name === null || name === undefined) {
    //   throw new BadRequestError("Name cannot be empty.");
    // }

    if (confirmPassword !== password) {
      throw new BadRequestError("Passwords do not match.");
    }

    const user = User.build({
      name,
      goal,
      gender,
      bodyType,
      height,
      weight,
      dob,
      activityLevel,
      email,
      password,
    });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        name: user.name,
        goal: user.goal,
        gender: user.gender,
        bodyType: user.bodyType,
        height: user.height,
        weight: user.weight,
        dob: user.dob,
        activityLevel: user.activityLevel,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    return res.status(201).json({
      user,
      userJwt,
    });
  }
);

export { router as signUpRouter };
