import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
const DB_URL = "mongodb://localhost:27017/trendease_v2";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Database - User"))
  .catch((err) => console.log("Error on User ", err));

interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  dateOfBirth?: string;
  address: string;
  profilePicture: string;

  store?: Schema.Types.ObjectId;
  generateAuthToken(): void;
}

const userSchema: Schema<IUserModel> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      default: "",
    },

    profilePicture: {
      type: String,
      default: "/assets/img/defaultPfp.png",
    },

    password: {
      type: String,
      required: true,
    },

    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function (this): string {
  const payload = {
    _id: this._id,
    fullName: this.firstName + " " + this.lastName,
    store: this.store,
    pfp: this.profilePicture,
  };
  return jwt.sign(payload, "jwtSecretKey");
};

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
