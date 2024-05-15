import { Router } from "express";
import isAuth from "../middleware/isAuth";
import {
  addToCart,
  deleteCart,
  getUserCart,
} from "../controller/cartController";

const app = Router();

app.get("/getUserCart", isAuth, getUserCart);
app.post("/addToCart/:productId", isAuth, addToCart);
app.delete("/deleteCart/:cartId", isAuth, deleteCart);
export default app;
