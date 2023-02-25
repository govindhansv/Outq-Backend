import mongoose from "mongoose";

const TimeSlotSchema = new mongoose.Schema(
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
    }
);

const TimeSlot = mongoose.model("TimeSlot",TimeSlotSchema);
export default TimeSlot;
