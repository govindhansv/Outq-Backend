import mongoose from "mongoose";

const NotiSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    userid: {
      type: String,
      default:""
    },
    storeid: {
      type: String,
      default:""
    },
  },
);

const Noti = mongoose.model("Noti", NotiSchema);
export default Noti;
