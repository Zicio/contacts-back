import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import keys from "../keys/keys";
import loginData from "../data/loginData";

const postAuth = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    await req.body;
  const coincidence: number = loginData.findIndex(
    (e) => e.username === username && e.password === password
  );
  if (coincidence !== -1) {
    const id: string = uuidv4();
    const jwToken: string = jwt.sign(
      {
        id: id,
      },
      keys,
      { expiresIn: "1h" }
    );
    res.status(200);
    res.cookie("jwToken", jwToken, {
      expires: new Date(Date.now() + 90000),
      httpOnly: true,
    });
    res.json(loginData[coincidence].username);
  } else {
    res.status(401).json("Неправильное имя пользователя/пароль");
  }
};

export default postAuth;
