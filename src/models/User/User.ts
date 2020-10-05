import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import IUser from "./User.types";

const userSchema: Schema = new Schema({
  _id: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  account: {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    telephone: {
      type: Number,
      required: false,
    },
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

userSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique",
});

export default model<IUser>("User", userSchema);
