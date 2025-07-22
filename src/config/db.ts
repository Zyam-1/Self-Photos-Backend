import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGO_URI;
    console.log(mongoURI);
    if (!mongoURI) {
        console.error("Connection Failed");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("Connection  Successful");
    } catch (error: any) {
        if (error instanceof Error) {
            console.error("Connection Error: ", error);
        }
        else {
            console.error("Unknown Error. error not instance of Error");
            process.exit(1);
        }
    }
}
export default connectToDB;