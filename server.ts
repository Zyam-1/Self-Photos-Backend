import env from "dotenv";
// move it below app when deploying
env.config();
import app from "./src/app";


const PORT: string = process.env.PORT || "5000";

app.listen(PORT, () => {
    console.log(`Application running on PORT ${PORT}`);
})