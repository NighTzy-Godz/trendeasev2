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
    if (!req.files)
      return res.status(400).send("Product Image/s cannot be empty");

    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const imgLinks = files.map((item) => item.path);

    const currStoreId = req.user?.store;
    const currStore = await Store.findOne({ _id: currStoreId }).select("_id");
    if (!currStore) return res.status(404).send("Store did not found");

    const product = new Product({
      productName,
      description,
      price,
      quantity,
      category,
      images: imgLinks,
      store: currStoreId,
    });

    await product.save();

    res.send(product);
  } catch (error) {
    next(error);
  }
};

export const getAllStoreProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { storeId } = req.params;
    const storeProducts = await Product.find({ store: storeId });

    res.json(storeProducts);
  } catch (error) {
    next(error);
  }
};

export const getProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).send("Product did not found");

    res.json(product);
  } catch (error) {
    next(error);
  }
};
