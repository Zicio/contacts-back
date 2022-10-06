import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.cookies);
    const token: string | undefined = req.cookies.token;
    if (!token) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData = jwt.verify(token, keys);
    req.user = decodedData;
    next();
  } catch (e) {
    res.clearCookie("token");
    // res.redirect("/");
    res.json("Пользователь не авторизован");
  }
  // try {
  //   const token: string | undefined = req.headers.authorization?.split(" ")[1];
  //   if (!token) {
  //     return res.status(403).json("Пользователь не авторизован");
  //   }
  //   const decodedData = jwt.verify(token, keys);
  //   req.user = decodedData;
  //   next();
  // }
  // catch(e) {
  // return res.status(403).json("Пользователь не авторизован");
  // })
};
