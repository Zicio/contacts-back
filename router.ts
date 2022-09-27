import { Router, Request, Response } from "express";
import registeredContacts from "./registeredContacts.js";

const router = Router();

router.post("/authorization", async (req: Request, res: Response) => {
  console.log("yes");
  console.log(req.body);
  // const { login, password } = req.body;
  // const coincidence = registeredContacts.findIndex(
  //   (e) => e.login === login && e.password === password
  // );
  // res.json(coincidence);
});

export default router;
