import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    parentName: {
      type: String,
    },
    class: {
      type: String,
    },
    parentPhone: {
      type: String,
    },
    monthlyFee: {
      type: String,
    },
    quarterFee: {
      type: String,
    },
    annualFee: {
      type: String,
    },
    dayAdmission: {
      type: String,
    },
    typeCourse: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
