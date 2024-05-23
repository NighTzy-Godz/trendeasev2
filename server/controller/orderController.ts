import { NextFunction, Request, Response } from "express";
import { addOrderValidator } from "../validator/orderValidator";
import User from "../models/User";
import Order, { OrderItem } from "../models/Order";
import Product from "../models/Product";
import Cart from "../models/Cart";
import mongoose from "mongoose";

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const SHIPPING_FEE = 40;
    const TAX_RATE = 0.012;

    const { shippingAddress, checkoutItems, clearCart, paymentMethod } =
      req.body;

    const items = checkoutItems as OrderItem[];

    const { error } = addOrderValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    const currUser = await User.findById(currUserId);
    if (!currUser) return res.status(404).send("Current User cannot be found");

    const { street, baranggay, houseNumber, province, municipality } =
      currUser.address || {};
    const insufficientAddress =
      !street || !baranggay || !houseNumber || !province || !municipality;

    if (insufficientAddress && shippingAddress) {
      currUser.address = shippingAddress;
      await currUser.save();
    }

    if (!currUser.address && !shippingAddress) {
      return res.status(400).send("Please set your address first");
    }

    const productIds = items.map((item: OrderItem) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    for (let item of items) {
      const product = products.find(
        (product) => product._id.toString() === item.product
      );
      if (!product)
        return res.status(404).send("Some of the items are missing");

      if (parseInt(product.quantity) < item.quantity) {
        return res
          .status(400)
          .send(`Insufficient stocks for item ${product.productName}`);
      }
    }

    for (let item of items) {
      const product = products.find(
        (product) => product._id.toString() === item.product
      );
      const subTotal = item.quantity * item.price;
      const tax = subTotal * TAX_RATE;
      const totalAmount = subTotal + SHIPPING_FEE + tax;

      const order = new Order({
        buyer: currUserId,
        item,
        shippingAddress: shippingAddress || currUser.address,
        subTotal,
        tax,
        totalAmount,
        paymentMethod,
        shippingFee: SHIPPING_FEE,
      });

      await order.save();

      if (product) {
        let prodQty = parseInt(product.quantity);
        const newQty = (prodQty -= item.quantity);
        product.quantity = newQty.toString();
        await product.save();
      }
    }

    if (clearCart) {
      await Cart.deleteMany({ user: currUserId });
    }
    await session.commitTransaction();
    res.status(200).json("Orders Placed");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
