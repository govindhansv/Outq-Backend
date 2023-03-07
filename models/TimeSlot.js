import mongoose from "mongoose";

const TimeSlotSchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    storeid: {
      type: String,
    },
    times: {
      type: Array,
      default: [],
    },
    }
);

const TimeSlot = mongoose.model("TimeSlot",TimeSlotSchema);
export default TimeSlot;

// import mongoose from "mongoose";

// const TimeSlotSchema = new mongoose.Schema(
//   {
//     start: {
//       type: String,
//     },
//     end: {
//       type: String,
//     },
//     storeid: {
//       type: String,
//     },
//     serviceid: {
//       type: String,
//     },
//     date: {
//       type: String,
//     },
//     }
// );

// const TimeSlot = mongoose.model("TimeSlot",TimeSlotSchema);
// export default TimeSlot;
