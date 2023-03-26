import express from "express";
import {login,register,createbus,allbus,allownerbus,createcollection,allcollection,driverlogin, delBus } from "../controllers/bus.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/driver/login", driverlogin);
router.post("/create/bus/", createbus);

router.post("/create/collection", createcollection);
router.get("/collection/viewall/:ownerId", allcollection);
router.get("/viewall/", allbus);
router.get("/viewall/:ownerId", allownerbus);
router.get("/delete/:id", delBus           );

export default router;
