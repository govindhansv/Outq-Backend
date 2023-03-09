import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    ogprice: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:"https://www.shutterstock.com/image-photo/female-hairdresser-standing-making-hairstyle-260nw-391326496.jpg"
    },
    storeid: {
      type: String,
      required: true,
    },
    ownerid: {
      type: String,
      required: true,
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
