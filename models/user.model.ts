import { Schema, model, models, Document, Model } from "mongoose";
import { Roles } from "../typedefs/roles";

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: Roles.AGENT,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    lastLogin: Date,
  },
  { timestamps: true, versionKey: false }
);

const User = models.User || model("User", UserSchema);

export default User;
