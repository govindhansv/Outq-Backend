import mongoose from "mongoose";

const BusOwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    pswd: {
      type: String,
      min: 5,
    },
    deviceid: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
    },
    cpswd: {
      type: String,
    },
  },
);
// OwnerSchema.inde
const BusOwner = mongoose.model("BusOwner", BusOwnerSchema);
export default BusOwner;

