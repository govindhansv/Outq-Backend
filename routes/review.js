import express from "express";
import { deleteReview, getSingleReview, getStoreReviews, postReview, updateReview } from "../controllers/review.js";

const router = express.Router();


// POST a new review
router.post('/',postReview);

// GET all reviews
router.get('/get/:storeid',getStoreReviews);

// GET a specific review by ID
router.get('/single/:reviewId',getSingleReview);

// PATCH (update) a review by ID
router.patch('/update/:reviewId',updateReview);

// DELETE a review by ID
router.delete('/delete/:reviewId',deleteReview);


export default router;