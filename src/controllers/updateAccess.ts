import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";

const updateAccess = async (req: Request, res: Response) => {
  try {
    const { refreshJwToken }: { refreshJwToken: string } = await req.cookies;
    res.clearCookie("refreshJwToken");
    const accessKey: string = process.env.ACCESS_SECRET as string;
    const refreshKey: string = process.env.ACCESS_SECRET as string;
    const id: string = uuidv4();
    const accessJwToken: string = jwt.sign(
      {
        id: id,
      },
      accessKey,
      { expiresIn: "1h" }
    );
    const newRefreshJwToken: string = jwt.sign(
      {
        value: crypto.randomBytes(4).toString("hex"),
      },
      refreshKey,
      { expiresIn: "1h" }
    );

    res.status(200);
    res.cookie("accessJwToken", accessJwToken, {
      expires: new Date(Date.now() + 3600000),
    });
    res.cookie("refreshJwToken", newRefreshJwToken, {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export default updateAccess;
