import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      required: true,
      min: 2,
      max: 50,
    },
  
    // ownerf: {
    //   type: String,
    //   required: true,
    //   min: 2,
    //   max: 50,
    // },
    // ownerl: {
    //   type: String,
    //   required: true,
    //   min: 2,
    //   max: 50,
    // },
    location: {
      type: String,
      required: true,
      max: 50,
    },
    id: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      max: 50,
    },
    type: {
      type: String,
      required: true,
      max: 50,
    },
    img: {
      type: String,
      default:"https://www.shutterstock.com/image-photo/female-hairdresser-standing-making-hairstyle-260nw-391326496.jpg"
    },
    followers: {
      type: Map,
      of: Boolean,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    employees: {
      type: String,
    },
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    pincode: {
      type: String,
    },
    gender: {
      type: String,
    },
    working: {
      type: String,
      default:"on"
    },
    reviews: {
      type: String,
    },
    reviewcount: {
      type: Number,
    },
    followerslist: {
      type: Array,
      default: [],
    },
    followerscount: {
      type: String,
    },
    bookedtimes: {
      type: Array,
      default: [],
    },
 
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);
export default Store;
