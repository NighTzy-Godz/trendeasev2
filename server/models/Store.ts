import mongoose, { Schema, Document } from "mongoose";

const DB_URL = "mongodb://localhost:27017/trendease_v2";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Database - Store"))
  .catch((err) => console.log("Error on Store ", err));

interface IStoreModel extends Document {
  pfp: string;
  storeName: string;
  description: string;
  owner: Schema.Types.ObjectId;
  email: string;
  phone: string;
  products: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema: Schema<IStoreModel> = new Schema(
  {
    pfp: {
      type: String,
      required: true,
      default: "/assets/img/defaultStorePfp.png",
    },
    storeName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Store = mongoose.model<IStoreModel>("Store", storeSchema);

export default Store;
