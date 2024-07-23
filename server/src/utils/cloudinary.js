import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";

if(!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
export const upload = multer({ storage });

cloudinary.config({
    // cloud_name: process.env.UPLOAD_CLOUD,
    cloud_name: 'next-ecom-cloud',
    // api_key: process.env.API_KEY,
    api_key: '225228752521523',
    // api_secret: process.env.API_SECRET,
    api_secret: 'ggeE9dVaf0ZIcRpbx5HVLIUoBTk',
})

export default async function cloudinaryUpload(localFilePath) {
    return cloudinary.uploader.upload(localFilePath)
    .then(result => {
        fs.unlinkSync(localFilePath);
        return { message: "success", url: result.url };
    })
    .catch(err => {
        fs.unlinkSync(localFilePath);
        return { message: "fail" };
    })
}