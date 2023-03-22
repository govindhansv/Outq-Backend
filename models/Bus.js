import mongoose from "mongoose";

const BusSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      min: 2,
      max: 50,
    },
    number: {
      type: String,
    },
    id: {
      type: String,
    },
    pswd: {
      type: String,
    },
    startplace: {
      type: String,
    },
    endplace: {
        type: String,
    }
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", BusSchema);
export default Bus;
