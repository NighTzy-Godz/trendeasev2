import mongoose, { Schema, Document } from "mongoose";
import ProductCategory from "../interface/productInterface";
const DB_URL = "mongodb://localhost:27017/trendease_v2";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Database - Product"))
  .catch((err) => console.log("Error on Product ", err));

interface IProductModel extends Document {
  productName: string;
  description: string;
  price: string;
  quantity: string;
  category: ProductCategory;
  images: string[];
  store: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<IProductModel> = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: Object.values(ProductCategory),
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProductModel>("Product", productSchema);

export default Product;
