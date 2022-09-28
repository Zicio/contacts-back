import { Router, Request, Response } from "express";
import registeredUsers from "./registeredUsers";

const router = Router();

router.post("/authorization", (req: Request, res: Response) => {
  console.log(req.body);

  const { username, password } = req.body;
  const coincidence = registeredUsers.findIndex(
    (e) => e.username === username && e.password === password
  );
  res.json(coincidence);
});

export default router;
