import express from "express";
import {addService,getService,getStoreServices,oldgetAllService,getAllService,delService,updateService,searchServices } from "../controllers/service.js";

const router = express.Router();


router.post("/create", addService);
router.get("/getall/", oldgetAllService);
router.get("/getall/:userid", getAllService);
router.get("/get/:storeid", getStoreServices);
router.get("/getservice/:serviceId", getService);
router.get('/del/:id',delService);
router.post("/edit/:id", updateService);
router.get("/search/:query/:userid", searchServices);

export default router;
