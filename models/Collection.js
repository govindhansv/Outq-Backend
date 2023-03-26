import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema(
  {
    busid: {
      type: String,
    },
    name: {
      type: String,
    },
    ownerid: {
      type: String,
    },
    amount: {
      type: String,
    },
    date: {
      type: String,
    },
    cid: {
      type: String,
    },
    }
);

const Collection = mongoose.model("Collection", CollectionSchema);
export default Collection;
