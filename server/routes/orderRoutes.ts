import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addOrder, getMyOrders } from "../controller/orderController";

const app = Router();

app.get("/myOrders", isAuth, getMyOrders);
app.post("/addOrder", isAuth, addOrder);

export default app;
