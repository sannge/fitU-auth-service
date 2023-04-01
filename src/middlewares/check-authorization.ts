import { NotAuthorizedError } from "@sanngetickets/common";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

function checkAuthorization(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    throw new NotAuthorizedError();
  }

  const token = req.headers.authorization;

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!);
    req.currentUser = payload as UserPayload;
  } catch (err) {
    throw new NotAuthorizedError();
  }
  next();
}

export { checkAuthorization };
