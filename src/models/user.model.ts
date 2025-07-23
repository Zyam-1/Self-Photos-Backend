import mongoose, {Document} from "mongoose";


export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    storageUsed: number,
    storageLimit: number,
    backupTime: string
}


const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    storageUsed: {type: Number, default: 0},
    storageLimit: {type: Number, default: 1024 * 1024 * 1024}, //storage in bytes
    backupTime: {type: String, default: "02:00"}
})


const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
