import express from "express";
import  { registerUser, login, logoutUser } from "../controllers/Auth.controller.js";
import { upload } from "../middleware/multerMiddleware.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", upload.fields([{ name: "ProfileImage", maxCount: 1 }]), registerUser);
router.post("/login", login);
router.post("/logout", logoutUser);

export default router;