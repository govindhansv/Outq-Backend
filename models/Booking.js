import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
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
    img: {
      type: String,
    },
    username: {
      type: String,
    },
    }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
