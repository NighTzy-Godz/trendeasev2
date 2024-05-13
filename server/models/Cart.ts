import mongoose, { Schema, Document } from "mongoose";
const DB_URL = "mongodb://localhost:27017/trendease_v2";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the database - Cart"))
  .catch((err) => console.log("Error on Cart - ", err));

interface ICart extends Document {
  item: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema<ICart> = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
