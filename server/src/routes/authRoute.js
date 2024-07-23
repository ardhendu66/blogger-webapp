import express from "express";
import { loginUser, signupUser, logoutUser } from "../controllers/user.js";
import { authorization } from "../utils/authorization.js";
const router = express.Router();

router.post("/register", signupUser);
router.post("/login", loginUser);
router.post("/logout", authorization, logoutUser);

export default router;