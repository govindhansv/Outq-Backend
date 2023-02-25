import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // firstName: {
    //   type: String,
    //   required: true,
    //   min: 2,
    //   max: 50,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    //   min: 2,
    //   max: 50,
    // },
    name: {
      type: String,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    pswd: {
      type: String,
      required: true,
      // min: 5,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    pincode: {
      type: String,
    },
    longitude: {
      type: String,
      default:" ",
    },
    latitude: {
      type: String,
      default:" "
    },
    // picturePath: {
    //   type: String,
    //   default: "",
    // },
    // friends: {
    //   type: Array,
    //   default: [],
    // },
    // occupation: String,
    // viewedProfile: Number,
    // impressions: Number,
  },
);

const User = mongoose.model("User", UserSchema);
export default User;
