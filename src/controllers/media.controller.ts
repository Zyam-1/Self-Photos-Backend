import {Request, Response} from "express";
import mediaModel from "../models/media.model";


export const mediaUpload = async (req: Request, res: Response) => {
    try {
        if(!req.user){
            return res.status(401).json({message: "Not Authorized"});
        }

        const files = req.files as Express.Multer.File[];
        // return if no files
        if(!files || files.length === 0){
            return res.status(400).json({message: "No File Uploaded"});
        }

        const mediaToBeUploaded = files.map((file) => ({
            userID: req.user?._id,
            filePath: file.path,
            fileName: file.filename,
            fileType: file.mimetype
        }));

        const savedMedia = await mediaModel.insertMany(mediaToBeUploaded);
        return res.status(201).json({
            message: "File Uploaded Successfully",
            media: savedMedia
        });
    } catch (error) {
        console.error("Error in mediaUpload: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}