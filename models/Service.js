import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
    ogprice: {
      type: String,
    },
    img: {
      type: String,
      default:"https://www.shutterstock.com/image-photo/female-hairdresser-standing-making-hairstyle-260nw-391326496.jpg"
    },
    storeid: {
      type: String,
    },
    ownerid: {
      type: String,
    },
    duration: {
      type: String,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    storename: {
      type: String,
    },
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    distance: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);
export default Service;
