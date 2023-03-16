import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    storeid: {
        type: String,
    },
    user: Object
},
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
