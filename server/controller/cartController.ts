import { NextFunction, Request, Response } from "express";
import { addToCartValidator } from "../validator/cartValidator";
import Product from "../models/Product";
import Cart from "../models/Cart";

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;
    if (!currUserId) {
      return res.status(401).send("Unauthorized: User not authenticated");
    }

    const cartItems = await Cart.find({ user: currUserId }).populate("item");

    res.json(cartItems);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;
    const { productId } = req.params;

    if (!currUserId) {
      return res.status(401).send("Unauthorized: User not authenticated");
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    let cartItem = await Cart.findOne({ item: productId, user: currUserId });

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new Cart({ item: productId, user: currUserId, quantity: 1 });
    }

    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    next(error);
  }
};
