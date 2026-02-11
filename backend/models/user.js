import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requierd: true,
    },
    email: {
      type: String,
      requierd: true,
    },
    phone: {
      type: String,
      requierd: true,
    },
    password: {
      type: String,
      requierd: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
