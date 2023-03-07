import mongoose from "mongoose";

const DeviceidSchema = new mongoose.Schema(
  {
    deviceid: {
      type: String,
    },
    id: {
      type: String,
        },
    type: {
      type: String,
        },
  },
);

const Deviceid = mongoose.model("Deviceid", DeviceidSchema);
export default Deviceid;
