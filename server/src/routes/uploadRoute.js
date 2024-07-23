import express from "express";
import cloudinaryUpload, { upload } from "../utils/cloudinary.js";
import { authorization } from "../utils/authorization.js";

const router = express.Router();

router.post("/", authorization, (req, res, next) => {
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    next();
}, upload.single('thumbnail_image'), async (req, res) => {
    try {
        if (!req.file) {
            console.log("No file uploaded");
            return res.status(400).json({ error: "No file uploaded" });
        }

        const resp = await cloudinaryUpload(req.file.path);
        res.status(200).json({ url: resp.url });
    } catch (err) {
        console.error("Error uploading to Cloudinary:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;