import express from "express";
import {fetch } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/analytics/:storeid/:today/:yesterday", fetch);


export default router;
