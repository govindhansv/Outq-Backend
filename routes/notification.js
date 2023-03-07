import express from "express";
import {notify,userFetch,ownerFetch,ocreate,ucreate } from "../controllers/notification.js";

const router = express.Router();


// booking and followng noti manager
router.get("/fetch/user/:userid/:deviceid", userFetch);
router.get("/fetch/owner/:store/:deviceid", ownerFetch);
router.get("/notify/", notify);
router.get("/create/u/:userid", ucreate);
router.get("/create/s/:storeid", ocreate);


export default router;
