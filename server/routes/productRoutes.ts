import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { createProduct } from "../controller/productController";
import hasStore from "../middleware/hasStore";
const app = Router();

app.post("/createProduct", [isAuth, hasStore], createProduct);
