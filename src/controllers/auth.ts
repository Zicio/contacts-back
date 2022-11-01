import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import loginData from "../data/loginData";

const auth = async (req: Request, res: Response) => {
  const accessKey: string = process.env.ACCESS_SECRET as string;
  const refreshKey: string = process.env.ACCESS_SECRET as string;
  const { username, password }: { username: string; password: string } =
    await req.body;
  const coincidence: number = loginData.findIndex(
    (e) => e.username === username && e.password === password
  );
  if (coincidence !== -1) {
    const id: string = uuidv4();
    const accessJwToken: string = jwt.sign(
      {
        id: id,
      },
      accessKey,
      { expiresIn: "1m" }
    );
    const refreshJwToken: string = jwt.sign(
      {
        value: crypto.randomBytes(4).toString("hex"),
      },
      refreshKey,
      { expiresIn: "1h" }
    );

    res.status(200);
    res.cookie("accessJwToken", accessJwToken, {
      expires: new Date(Date.now() + 60000),
    });
    res.cookie("refreshJwToken", refreshJwToken, {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true,
    });
    res.json(loginData[coincidence].username);
  } else {
    res.status(401).json("Неправильное имя пользователя/пароль");
  }
};

export default auth;
