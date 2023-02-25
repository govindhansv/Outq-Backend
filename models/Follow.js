import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema(
  {
    storeid: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
  },
);

const Follow = mongoose.model("Follow", FollowSchema);
export default Follow;
