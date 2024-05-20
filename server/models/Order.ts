import { number } from "joi";
import mongoose, { Schema, Document } from "mongoose";
const DB_URL = "mongodb://localhost:27017/trendease_v2";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the database - Order"))
  .catch((err) => console.log("Error on Order - ", err));

interface IOrder extends Document {
  buyer: mongoose.Types.ObjectId;
  item: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    productOwner: mongoose.Types.ObjectId;
  };
  paymentMethod: string;
  shippingAddress: {
    houseNumber: string;
    street: string;
    province: string;
    municipality: string;
    barangay: string;
  };
  subTotal: number;
  shippingFee: number;
  totalAmount: number;
  tax: number;
}

const orderSchema: Schema<IOrder> = new Schema<IOrder>({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  item: {
    product: {
      type: Schema.Types.ObjectId,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    productOwner: {
      type: Schema.Types.ObjectId,
      ref: " User",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    shippingAddress: {
      houseNumber: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      municipality: {
        type: String,
        required: true,
      },
      baranggay: {
        type: String,
        required: true,
      },
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
  },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
