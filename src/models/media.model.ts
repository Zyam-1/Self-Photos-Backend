import mongoose, {Document, mongo} from "mongoose";

export interface IMedia extends Document {
    userID: mongoose.Types.ObjectId,
    fileName: string,
    filePath: string,
    uploadedAt: Date
}


const mediaSchema = new mongoose.Schema<IMedia>({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    fileName: {type: String, required: true},
    filePath: {type: String, required: true},
<<<<<<< HEAD
    uploadedAt: {type: Date, default: Date.now()}
})


const mediaModel = mongoose.model<IMedia>("Media", mediaSchema);

export default mediaModel;
=======
    uploadedAt: {type: Date, default: new Date()}
})
>>>>>>> de311b36b6586215a1ae701940efc7588b2203af
