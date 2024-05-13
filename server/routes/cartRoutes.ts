import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addToCart } from "../controller/cartController";

const app = Router();

app.post("/addToCart/:productId", isAuth, addToCart);

export default app;
