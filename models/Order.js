import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
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
    userid: {
      type: String,
    },
    bookingid: {
      type: String,
    },
    price: {
      type:String
    },
    date: {
      type: String,
    },
    servicename: {
      type: String,
    },
    storename: {
      type: String,
    },
    status: {
      type: String,
    },
    orderid: {
      type: String,
    },
    ownerid: {
      type: String,
    },
    }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
