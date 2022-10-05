import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";
import registeredUsers from "../data/registeredUsers";

export const postAuth = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const coincidence = registeredUsers.findIndex(
    (e) => e.username === username && e.password === password
  );
  if (coincidence !== -1) {
    const token: string = jwt.sign(
      {
        name: registeredUsers[coincidence].username,
      },
      keys,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .cookie("token", `Bearer ${token}`, {
        httpOnly: true,
      })
      .json();

    // res.status(200).json(`Bearer ${token}`);
  } else {
    res.status(401).json("Неправильное имя пользователя/пароль");
  }
};
