import mongoose from "mongoose";

const ErrorSchema = new mongoose.Schema(
  {
   any: Schema.Types.Mixed
  },
);

const Error = mongoose.model("Error", ErrorSchema);
export default Error;
