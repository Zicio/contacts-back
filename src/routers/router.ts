import { Router } from "express";
import { postAuth } from "../controllers/controller";

const router = Router();

router.post("/authorization", postAuth);

export default router;
