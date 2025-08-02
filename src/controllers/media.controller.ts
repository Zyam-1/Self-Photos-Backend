import {Request, Response} from "express";
import mediaModel from "../models/media.model";
import path from "path";

const BASE_URL = process.env.BASE_URL;


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


export const getMediaData = async (req: Request, res: Response) => {
    //pagination
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    try {
        const _id = req.user?._id;
        const images = await mediaModel.find({_id}).sort({uploadedAt: -1 }).skip(skip).limit(perPage);

        if(!images){
            return res.status(404).json({message: "No Images Found"});
        }

        const imageURIs = images.map((image) => ({
            id: image._id,
            url: `${BASE_URL}/media/${image.fileName}`,
            createdAt: image.uploadedAt
        }));

        return res.json({images: imageURIs});        
    } catch (error) {
        console.error("Error in getMediaData: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


export const getMediaFile = async (req: Request, res: Response) => {
    try {
        const _id = req.user?._id;
        const fileName = req.params.filename;
        const image = await mediaModel.findOne({fileName});
        if(!image) {
            return res.status(404).json({message: "Image Not Found"});
        }
        if(image.userID !== _id){
            return res.status(403).json({message: "Not Authorised"});
        }
        const filePath = path.join(__dirname, "..", "uploads", fileName);
        return res.sendFile(filePath);        
    } catch (error) {
        console.error("Error in getMediaFiles: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}