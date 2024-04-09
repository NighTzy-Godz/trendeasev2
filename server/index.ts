import express, { json, urlencoded, static as static_ } from "express";
import path from "path";

import cors from "cors";
import userRoutes from "./routes/userRoutes";
import storeRoutes from "./routes/storeRoutes";
import productRoutes from "./routes/productRoutes";

const PORT = 8080;
const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(static_(path.join(__dirname, "src", "assets")));

app.use("/api/user", userRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/product", productRoutes);

const server = app.listen(PORT, () => console.log("Connected on PORT ", PORT));
export default server;
