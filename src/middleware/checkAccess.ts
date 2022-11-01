import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const checkAcess = async (req: Request, res: Response, next: NextFunction) => {
  const accessKey: string = process.env.ACCESS_SECRET as string;
  // const refreshKey: string = process.env.ACCESS_SECRET as string;
  // Проверяем присутствие и валидность куки с jwt в запрос пользователя
  try {
    const { accessJwToken }: { accessJwToken: string } = await req.cookies;
    if (!accessJwToken) {
      return res.status(403).json("Пользователь не авторизован");
    }
    const decodedData = jwt.verify(accessJwToken, accessKey) as JwtPayload;
    req.user = decodedData;
    next();
  } catch (e) {
    res.clearCookie("accessJwToken");
    res.clearCookie("refreshJwToken");
    res.json("Пользователь не авторизован");
  }
};

export default checkAcess;
