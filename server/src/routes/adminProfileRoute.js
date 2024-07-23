import express from "express";
import { updateProfileImage } from "../controllers/user.js";
import { authorization } from "../utils/authorization.js";
const router = express.Router();

// router.get("/", authorization, checkSession);
router.put("/profile", authorization, updateProfileImage);

export default router;