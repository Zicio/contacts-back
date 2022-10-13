import { Request, Response } from "express";
import tokenData from "../data/tokenData";

const logout = async (req: Request, res: Response) => {
  //Находим токен пользователя в массиве токенов и удаляем его оттуда
  try {
    const { token }: { token: string } = await req.cookies;
    tokenData.forEach((item, index, array) => {
      if (item.token === token) {
        array.splice(index, 1);
      }
    });
    res.clearCookie("token");
    res.status(200).json("Вы успешно вышли из профиля");
  } catch (e) {
    console.log(e);
  }
};

export default logout;
