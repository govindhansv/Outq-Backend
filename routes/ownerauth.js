import express from "express";
import { login,register,getlogin,getreg } from "../controllers/ownerauth.js";

const router = express.Router();
router.get("/login", getlogin)
router.get("/reg", getreg)
router.post("/login", login);
router.post("/register", register);

export default router;
