import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../controller/userController";
import isAuth from "../middleware/isAuth";

const app = Router();

app.post("/registerUser", registerUser);
app.post("/loginUser", loginUser);
app.post("/updateUser", isAuth, updateUser);
export default app;
