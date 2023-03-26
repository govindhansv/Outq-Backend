import express from "express";

import authRoutes from "../routes/auth.js";


const router = express.Router();

router.use('/auth/user', authRoutes);

export default router;
