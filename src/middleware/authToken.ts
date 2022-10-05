import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData = jwt.verify(token, keys);
    req.user = decodedData;
    next();
  } catch (e) {
    return res.status(403).json("Пользователь не авторизован");
  }
};
