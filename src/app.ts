import cors from "cors";
<<<<<<< HEAD
import router from "./routes/user.route";
=======
import router from "./routes/index";
>>>>>>> de311b36b6586215a1ae701940efc7588b2203af
import express, { Application } from "express";
import connectToDB from "./config/db";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

connectToDB();

export default app;

