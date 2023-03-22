import express from "express";
import {login,register,createbus,allbus,createcollection,allcollection,driverlogin } from "../controllers/bus.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/driver/login", driverlogin);
router.post("/create/bus/", createbus);
router.post("/create/collection", createcollection);
router.get("/collection/viewall", allcollection);
router.get("/viewall/", allbus);

export default router;
