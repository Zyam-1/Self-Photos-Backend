import multer from "multer";
import path from "path";

//storage configuration. Images will be uploaded to uploads folder
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "/uploads")
    },
    filename: (_req, file, cb) => {
        const uniqueFileName = Date.now().toString(36) + Math.random().toString(36).substr(2);
        cb(null, `${uniqueFileName}-${file.originalname}`);
    }
});


//filter file by extensions
const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}


export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 50 * 1024 * 1024
    }
})
