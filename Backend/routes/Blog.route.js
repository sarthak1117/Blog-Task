import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../controllers/Blog.controller.js";
import { upload } from "../middleware/multerMiddleware.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/blogs", upload.fields([{ name: "blogImage", maxCount: 1 }]), createBlog);
router.get("/blogs",  getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id",  upload.single("image"), updateBlog)
router.delete("/blogs/:id", deleteBlog);

export default router;
