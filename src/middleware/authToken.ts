import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req
    .header("Authorization")
    ?.replace("Bearer ", "");
  if (!token) {
    return res.status(401);
  }

  jwt.verify(token, keys, (err, user) => {
    if (err) {
      return res.status(403);
    }
    req.user = user;
    next();
  });
};
