import cors from "cors";
import userRouter from "./routes/auth.route";
import mediaRouter from "./routes/media.route";

import express, { Application } from "express";
import connectToDB from "./config/db";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", mediaRouter);


connectToDB();

export default app;

