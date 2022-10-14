import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import keys from "../keys/keys";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  // Проверяем присутствие и валидность куки с jwt в запрос пользователя
  try {
    const { jwToken }: { jwToken: string } = await req.cookies;
    if (!jwToken) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData = jwt.verify(jwToken, keys) as JwtPayload;
    req.user = decodedData;
    next();
  } catch (e) {
    res.clearCookie("jwToken");
    res.json("Пользователь не авторизован");
  }
};

export default authToken;
