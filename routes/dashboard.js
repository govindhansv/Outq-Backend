import express from "express";
import {fetch,services } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/analytics/:storeid/:today/:yesterday", fetch);
router.get("/analytics/services/:storeid", services);



export default router;
