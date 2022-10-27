import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessJwToken");
    res.status(200).json("Вы успешно вышли из профиля");
  } catch (e) {
    console.log(e);
  }
};

export default logout;
