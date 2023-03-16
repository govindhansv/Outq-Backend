import Review from "../models/Review.js";
import User from "../models/User.js";
import Store from "../models/Store.js";
import mongoose from "mongoose";

// GET all reviews
export const getStoreReviews = async (req, res) => {
    try {
        const count = await Review.find(
            { storeid: req.params.storeid });
        
        console.log(count.length);
        const id = req.params.storeid;

        Store.findByIdAndUpdate(
            { _id: req.params.storeid },
            {
                $set:
                {
                    reviews: 19
                }
            }
        ).then(async (data, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })

        Review.find({ "storeid": id })
            .then(reviews => {
                // console.log(" reviews \n", reviews);
                reviews.reverse();
                res.json(reviews);
            })
            .catch(err => {
                res.status(201).json({ error: err });
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// GET a specific review by ID
export const getSingleReview = async (req, res) => {
    try {
        const id = req.params.reviewId;
        Review.findById(id)
            .then(review => {
                res.json(review);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// POST a new review
export const postReview = async (req, res) => {
    try {

        console.log(req.body);
        let user = await User.findById(req.body.userid);

        const review = new Review({
            _id: new mongoose.Types.ObjectId(),
            rating: req.body.rating,
            comment: req.body.comment,
            storeid: req.body.storeid,
            user: user,
        });


        const savedReview = await review.save();
        console.log(savedReview);
        res.status(201).json({ status: true, review: savedReview });

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

// PATCH (update) a review by ID
export const updateReview = async (req, res) => {
    try {
        const id = req.params.reviewId;
        Review.findByIdAndUpdate(id, req.body, { new: true })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// DELETE a review by ID
export const deleteReview = async (req, res) => {
    try {
        const id = req.params.reviewId;
        Review.findByIdAndDelete(id)
            .then(() => {
                res.status(204).json({ message: 'Review deleted successfully' });
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


