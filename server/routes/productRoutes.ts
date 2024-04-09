import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { createProduct } from "../controller/productController";
import hasStore from "../middleware/hasStore";
import { storage } from "../cloudinary";
import multer from "multer";

const upload = multer({ storage });
const app = Router();

app.post(
  "/createProduct",
  upload.array("img"),
  [isAuth, hasStore],
  createProduct
);

export default app;
