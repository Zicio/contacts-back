import { Router } from "express";
import logout from "./../controllers/logout";
import getContacts from "./../controllers/getContacts";
import checkAcess from "../middleware/checkAccess";
import deleteContact from "../controllers/deleteContact";
import changeContact from "../controllers/changeContact";
import updateAccess from "../controllers/updateAccess";
import auth from "../controllers/auth";

const router = Router();

router.post("/authorization", auth);

router.get("/authorization", updateAccess);

router.get("/contacts", checkAcess, getContacts);

router.delete("/logout", logout);

router.delete("/contact", checkAcess, deleteContact);

router.post("/contact", checkAcess, changeContact);

export default router;
