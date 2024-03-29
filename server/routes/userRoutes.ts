import { Router } from "express";
import { registerUser } from "../controller/userController";

const app = Router();

app.post("/registerUser", registerUser);

export default app;
