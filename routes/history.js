import express from "express";
import { history,getOwnerStores,delStore,getStore,updateStore } from "../controllers/store.js";

const router = express.Router();

router.post("/history", history);
router.get("/:ownerId", getOwnerStores);
router.get("/store/get/:storeId", getStore);
router.get('/store/del/:id',delStore);
router.post("/edit/:id", updateStore);

export default router;