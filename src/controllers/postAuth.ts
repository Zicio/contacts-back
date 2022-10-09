import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";
import loginData from "../data/loginData";
import tokenData from "../data/tokenData";
import { IToken } from "../models/models";

export const postAuth = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const coincidence = loginData.findIndex(
    (e) => e.username === username && e.password === password
  );
  if (coincidence !== -1) {
    const jwToken: string = jwt.sign(
      {
        name: loginData[coincidence].username,
      },
      keys,
      { expiresIn: "1h" }
    );
    const token: IToken = {
      token: uuidv4(),
      username: username,
    };
    tokenData.push(token);

    res.status(200);
    res.cookie("jwToken", jwToken, {
      expires: new Date(Date.now() + 90000),
      httpOnly: true,
    });
    res.cookie("token", token.token, {
      expires: new Date(Date.now() + 90000),
      httpOnly: false,
    });
    res.json(loginData[coincidence].username);
  } else {
    res.status(401).json("Неправильное имя пользователя/пароль");
  }
};
