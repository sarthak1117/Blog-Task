import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const CreateBlog = () => {
  const [formData, setFormData] = useState({ Title: "", Description: "", blogImage: null });
  const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  
  if (!formData.Title || !formData.blogImage) {
    alert("Please fill in all fields and upload an image.");
    return;
  }

  

  const data = new FormData();
  data.append("Title", formData.Title); 
  data.append("Description", formData.Description);
  data.append("blogImage", formData.blogImage);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/blog/blogs`, data, {
      headers: {
                "Content-Type": "multipart/form-data"
      }, withCredentials: true
    });

    if (response.status === 201 || response.status === 200) {
      alert("Blog created successfully!");
      navigate("/Dashboard");
    } else {
      console.error("Unexpected response:", response);
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Blog creation failed:", err.response?.data || err.message);
    alert("Failed to create blog. Please try again.");
  }
};

  return (
    <>
     <Navbar/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <label>Title</label>
        <input type="text" name="Title" placeholder="Title" className="w-full p-2 border" onChange={handleChange} required />
         <label>Description</label>
        <textarea name="Description" placeholder="Description" className="w-full p-2 border" rows={5} onChange={handleChange} required></textarea>  
        <label>Upload Image</label>
        <input type="file" name="blogImage" className="border-2" onChange={handleChange} required />
        <button type="submit" className=" px-4 py-2 bg-blue-600 text-white rounded">Create</button>
        
      </form>
    </div>
    </>
  );
};

export default CreateBlog;
