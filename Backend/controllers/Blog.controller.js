import { Blog } from "../models/Blog.model.js";
import path from "path"

const createBlog = async(req,res) => {
    try{

    const {Title, Description} = req.body;

    if(!Title){
        return res.status(400).json({message: "Title is required"})
    }


    const blogImageFile = req.files["blogImage"]?.[0];

    if(!blogImageFile){
        return res.status(500).json({message:"Blog image is required"})
    }
    const blog = new Blog({
        Title,
        blogImage: blogImageFile?.filename || "",
        Description
    })

    await blog.save();

    return res.status(201).json({blog, message:"Blog created successfully"})
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }

}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({ blogs });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (Title) blog.Title = Title;
    if (Description) blog.Description = Description;


    if (req.file) {
      blog.blogImage = req.file.path;
    }

    await blog.save();

    return res.status(200).json({ blog, message: "Blog updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export {deleteBlog, createBlog, updateBlog, getAllBlogs, getBlogById}