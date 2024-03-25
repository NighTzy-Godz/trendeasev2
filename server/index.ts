import express, { json, urlencoded } from "express";

const PORT = 8080;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(PORT, () => console.log("Connected on PORT ", PORT));
