import express from "express";
import jwt from "jsonwebtoken";
import { checkAuthorization } from "../middlewares/check-authorization";
import { Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  checkAuthorization,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
