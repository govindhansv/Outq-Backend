import mongoose from "mongoose";

const TimingsSchema = new mongoose.Schema(
  {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    storeid: {
      type: String,
    },
    serviceid: {
      type: String,
    },
    date: {
      type: String,
    },
    status: {
      type: String,
    },
    }
);

const Timings = mongoose.model("Timings",TimingsSchema);
export default Timings;
