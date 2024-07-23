import express from "express";
import { createBlog, getAllBlogs, getSingleBlog } from "../controllers/blog.js";
import { authorization } from "../utils/authorization.js";
const router = express.Router();

router.get("/", getSingleBlog);
router.get("/all", getAllBlogs);
router.post("/create", authorization, createBlog);

export default router;