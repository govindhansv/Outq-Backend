import mongoose from "mongoose";

const ErrorSchema = new mongoose.Schema(
  {
   any: Object
  },{ strict: false }
);

const Error = mongoose.model("Error", ErrorSchema);
export default Error;
