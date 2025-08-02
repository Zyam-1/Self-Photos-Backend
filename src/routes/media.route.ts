import express from "express";
import { getMediaData, getMediaFile, mediaUpload } from "../controllers/media.controller";
import { upload } from "../config/multer";
import { protect } from "../middleware/auth.middleware";


const mediaRouter = express.Router();

mediaRouter.post("/upload", protect, upload.array("files", 10), mediaUpload);
//this route would get the media and urls
mediaRouter.get("/media", protect, getMediaData);
//this url will hit the url that is fetched in the /media endpoint
mediaRouter.get("/media/:filename", protect, getMediaFile);




export default mediaRouter;