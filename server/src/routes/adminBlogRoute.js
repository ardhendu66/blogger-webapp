import express from "express";
import { getBlogsOfAdmin, deleteBlogsOfAdmin } from "../controllers/blog.js";
import { authorization } from "../utils/authorization.js";
const router = express.Router();

router.get("/", authorization, getBlogsOfAdmin);
router.delete("/", authorization, deleteBlogsOfAdmin);

export default router;