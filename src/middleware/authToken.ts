import { IToken } from "./../models/models";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import tokenData from "../data/tokenData";
import keys from "../keys/keys";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  // Проверяем присутствие и валидность куки с jwt и доп. куки в запрос пользователя
  try {
    const { jwToken, token }: { jwToken: string; token: string } =
      await req.cookies;
    const coincidence: IToken | undefined = tokenData.find(
      (e) => e.token === token
    );
    if (!jwToken || !token || !coincidence) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData = jwt.verify(jwToken, keys) as JwtPayload;
    req.user = decodedData;
    next();
  } catch (e) {
    res.clearCookie("jwToken");
    res.clearCookie("token");
    res.json("Пользователь не авторизован");
  }
};

export default authToken;
