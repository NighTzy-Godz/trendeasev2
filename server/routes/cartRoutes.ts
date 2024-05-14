import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addToCart, getUserCart } from "../controller/cartController";

const app = Router();

app.get("/getUserCart", isAuth, getUserCart);
app.post("/addToCart/:productId", isAuth, addToCart);

export default app;
