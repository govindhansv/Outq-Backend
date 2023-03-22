import express from "express";
import { register,getOwnerStores,delStore,getStore,updateStore,getAllStore,oldgetAllStore,searchStore,queryStore,oldqueryStore,working,storelocation } from "../controllers/store.js";

const router = express.Router();

router.post("/register", register);
router.get("/store/get", oldgetAllStore);
router.get("/store/get/user/:userid", getAllStore);
router.get("/store/get/:storeId", getStore);
router.get('/store/del/:id',delStore);
router.post("/edit/:id", updateStore);
router.get("/search/:query",searchStore);
router.get("/type/:query/",oldqueryStore);
router.get("/type/:query/:userid",queryStore);
router.get("/:ownerId", getOwnerStores);
router.get("/working/:storeid/", working);
router.post("/location/:storeid", storelocation);

export default router;
