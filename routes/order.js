import express from "express";
import {viewall,storeorders,viewsingle,done } from "../controllers/order.js";

const router = express.Router();

router.get("/viewall/:userid", viewall);
router.get("/view/store/:storeid/", storeorders);
router.get("/view/single/:id", viewsingle);
router.get("/done/:id", done);


export default router;
