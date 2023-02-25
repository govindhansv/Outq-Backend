import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema(
    {
        top: {
            type: String
        },
        times: {
            type: Array
        },
        start: {
            type: String,
        },
        end: {
            type: String,
        },
        storeid: {
            type: String,
        },
        date: {
            type: String,
        },
    }
);

const Time = mongoose.model("Time", TimeSchema);
export default Time;
