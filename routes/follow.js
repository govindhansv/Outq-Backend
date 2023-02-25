import express from "express";
import {follow,viewstorefollowers,checkfollow } from "../controllers/follow.js";

const router = express.Router();

router.post("/follow/:storeid/:userid", follow);
// router.get("/unfollow/:userid", unfollow);
router.get("/view-followers/:storeid", viewstorefollowers);
router.get("/check/:storeid/:userid", checkfollow);


export default router;
