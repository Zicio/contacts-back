import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jwToken, token } = req.cookies;
    if (!jwToken || !token) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData = jwt.verify(jwToken, keys);
    req.user = decodedData;
    next();
  } catch (e) {
    res.clearCookie("jwToken");
    res.clearCookie("token");
    res.json("Пользователь не авторизован");
  }
};
