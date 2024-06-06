import { Router } from "express";
import {
  getUserData,
  loginUser,
  registerUser,
  updateUser,
  updateUserPassword,
} from "../controller/userController";
import isAuth from "../middleware/isAuth";

const app = Router();

app.get("/getUserData", isAuth, getUserData);

app.post("/registerUser", registerUser);
app.post("/loginUser", loginUser);
app.put("/updateUser", isAuth, updateUser);
app.put("/changePassword", isAuth, updateUserPassword);
export default app;
