import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
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
    const acessJwToken: string = jwt.sign(
      {
        id: id,
      },
      accessKey,
      { expiresIn: "1h" }
    );

    res.status(200);
    res.cookie("accessJwToken", acessJwToken, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });
    res.json(loginData[coincidence].username);
  } else {
    res.status(401).json("Неправильное имя пользователя/пароль");
  }
};

export default auth;
