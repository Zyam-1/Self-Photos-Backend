import mongoose, {Document, mongo} from "mongoose";
import { string } from "zod";

export interface IMedia extends Document {
    userID: mongoose.Types.ObjectId,
    fileName: string,
    filePath: string,
    fileType: string,
    uploadedAt?: Date
}


const mediaSchema = new mongoose.Schema<IMedia>({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    fileName: {type: String, required: true},
    filePath: {type: String, required: true},
    fileType: {type: String, required: true},
    uploadedAt: {type: Date, default: Date.now},
},{
    timestamps: true
})


const mediaModel = mongoose.model<IMedia>("Media", mediaSchema);

export default mediaModel;
