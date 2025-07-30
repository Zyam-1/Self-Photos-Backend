import cors from "cors";
import router from "./routes/auth.route";

import express, { Application } from "express";
import connectToDB from "./config/db";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

connectToDB();

export default app;

