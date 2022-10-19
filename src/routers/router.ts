import { Router } from "express";
import logout from "./../controllers/logout";
import getContacts from "./../controllers/getContacts";
import postAuth from "../controllers/postAuth";
import authToken from "../middleware/authToken";
import deleteContact from "../controllers/deleteContact";
import createContact from "../controllers/createContact";

const router = Router();

router.post("/authorization", postAuth);

router.get("/contacts", authToken, getContacts);

router.delete("/logout", logout);

router.delete("/contact", authToken, deleteContact);

router.post("/contact", authToken, createContact);

export default router;
