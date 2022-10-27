import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string = process.env.ACCESS_SECRET as string;
  const refreshToken: string = process.env.ACCESS_SECRET as string;
  // Проверяем присутствие и валидность куки с jwt в запрос пользователя
  try {
    const { accessJwToken }: { accessJwToken: string } = await req.cookies;
    if (!accessJwToken) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData = jwt.verify(accessJwToken, accessToken) as JwtPayload;
    req.user = decodedData;
    next();
  } catch (e) {
    res.clearCookie("jwToken");
    res.json("Пользователь не авторизован");
  }
};

export default authToken;
