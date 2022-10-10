import { IToken } from "./../models/models";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import tokenData from "../data/tokenData";
import keys from "../keys/keys";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jwToken, token } = await req.cookies;
    const coincidence: IToken | undefined = tokenData.find(
      (e) => e.token === token
    );
    if (!jwToken || !token || !coincidence) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData: JwtPayload | string = <JwtPayload>(
      jwt.verify(jwToken, keys)
    );
    req.user = decodedData;
    next();
  } catch (e) {
    res.clearCookie("jwToken");
    res.clearCookie("token");
    res.json("Пользователь не авторизован");
  }
};
