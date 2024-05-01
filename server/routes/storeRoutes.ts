import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { createStore } from "../controller/storeController";
import hasStore from "../middleware/hasStore";

const app = Router();

app.post("/createStore", [isAuth], createStore);

export default app;
