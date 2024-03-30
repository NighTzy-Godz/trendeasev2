import { Request, Response, NextFunction } from "express";
import { CreateProduct } from "../interface/productInterface";
import Store from "../models/Store";
import { createProductValidator } from "../validator/productValidator";
import Product from "../models/Product";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      productName,
      description,
      price,
      quantity,
      category,
    }: CreateProduct = req.body;

    const { error } = createProductValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currStoreId = req.user?.store;
    const currStore = await Store.findOne({ _id: currStoreId }).select(
      "products"
    );
    if (!currStore) return res.status(404).send("Store did not found");

    const product = new Product({
      productName,
      description,
      price,
      quantity,
      category,
    });

    res.send(product);
  } catch (error) {
    next(error);
  }
};
