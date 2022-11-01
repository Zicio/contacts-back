import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessJwToken");
    res.clearCookie("refreshJwToken");
    res.status(200).json("Вы успешно вышли из профиля");
  } catch (e) {
    res.status(404).json((e as Error).message);
  }
};

export default logout;
