import express from "express";
import { register,getOwnerStores,delStore,getStore,updateStore,getAllStore,searchStore } from "../controllers/store.js";

const router = express.Router();

router.post("/register", register);
router.get("/store/get/", getAllStore);
router.get("/store/get/:storeId", getStore);
router.get('/store/del/:id',delStore);
router.post("/edit/:id", updateStore);
router.get("/:ownerId", getOwnerStores);
router.get("/search/:query",searchStore);

export default router;
