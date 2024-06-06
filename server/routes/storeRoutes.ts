import { Router } from "express";
import isAuth from "../middleware/isAuth";
import {
  createStore,
  getMyStoreData,
  updateStore,
} from "../controller/storeController";

const app = Router();

app.get("/getMyStoreData", [isAuth], getMyStoreData);
app.post("/createStore", [isAuth], createStore);
app.put("/updateStore", [isAuth], updateStore);

export default app;
