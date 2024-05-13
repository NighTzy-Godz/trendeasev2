import { NextFunction, Request, Response } from "express";
import { addToCartValidator } from "../validator/cartValidator";
import Product from "../models/Product";
import Cart from "../models/Cart";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity } = req.body;
    const currUserId = req.user?._id;
    const productId = req.params;

    const { error } = addToCartValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).send("Product did not found");

    const newCart = new Cart({
      item: productId,
      user: currUserId,
      quantity,
    });

    await newCart.save();

    res.json(newCart);
  } catch (error) {
    next(error);
  }
};
