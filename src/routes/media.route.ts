import express from "express";
import { mediaUpload } from "../controllers/media.controller";
import { upload } from "../config/multer";
import { protect } from "../middleware/auth.middleware";


const mediaRouter = express.Router();

mediaRouter.post("/upload", protect, upload.array("files", 10), mediaUpload);


export default mediaRouter;