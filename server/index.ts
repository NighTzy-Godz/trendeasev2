import express, { json, urlencoded, static as static_ } from "express";
import path from "path";

const PORT = 8080;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(static_(path.join(__dirname, "src", "assets")));

app.listen(PORT, () => console.log("Connected on PORT ", PORT));
