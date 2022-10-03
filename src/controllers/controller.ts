import { Request, Response } from "express";
import registeredUsers from "../registeredUsers";

export const postAuth = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const coincidence = registeredUsers.findIndex(
    (e) => e.username === username && e.password === password
  );
  console.log(coincidence);
  if (coincidence !== -1) {
    res.status(200).json(registeredUsers[coincidence].username);
  } else {
    res.status(401).json("Неправильное имя пользователя/пароль");
  }
};
