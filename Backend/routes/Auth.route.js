import express from "express";
import logoutUser, { registerUser, login } from "../controllers/Auth.controller.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();


router.post("/register", upload.fields([{ name: "ProfileImage", maxCount: 1 }]), registerUser);
router.post("/login", login);
router.post("/logout", logoutUser);

export default router;