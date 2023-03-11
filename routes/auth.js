import express from "express";
import { getUserSavedStores, login,register,update,userlocation } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/update/:userid", update);
router.get("/location/:userid", userlocation);
router.get("/saved/:userid", getUserSavedStores);

export default router;
