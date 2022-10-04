import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";
import registeredUsers from "../registeredUsers";

export const postAuth = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const coincidence = registeredUsers.findIndex(
    (e) => e.username === username && e.password === password
  );
  if (coincidence !== -1) {
    const token: string = jwt.sign(
      {
        name: registeredUsers[coincidence].username,
        id: registeredUsers[coincidence].id,
      },
      keys,
      { expiresIn: 3600 }
    );
    res.status(200).json(`Bearer ${token}`);
  } else {
    res.status(401).json("Неправильное имя пользователя/пароль");
  }
};
