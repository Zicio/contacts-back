import { Request, Response } from "express";
import tokenData from "../data/tokenData";

export const logout = async (req: Request, res: Response) => {
  try {
    const { token } = await req.cookies;
    console.log(token);
    console.log(tokenData);
    tokenData.forEach((item, index, array) => {
      if (item.token === token) {
        array.splice(index, 1);
      }
    });
    res.status(200).json("Вы успешно вышли из профиля");
    console.log(tokenData);
  } catch (e) {
    console.log(e);
  }
};
