import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addOrder } from "../controller/orderController";

const app = Router();

app.post("/addOrder", isAuth, addOrder);

export default app;
