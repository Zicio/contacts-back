import { getContacts } from "./../controllers/getContacts";
import { Router } from "express";
import { postAuth } from "../controllers/postAuth";
import { authToken } from "../middleware/authToken";

const router = Router();

router.post("/authorization", postAuth);

router.get("/contacts", authToken, getContacts);

export default router;
