import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ Title: "", Description: "", blogImage: null });
  const navigate = useNavigate();


    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    const fetchBlog = async () => {
      // const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/Blog/blogs/${id}`, {
        withCredentials: true,
      });

     
      setFormData({ Title: res.data.Title, Description: res.data.Description, blogImage: null });
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("Title", formData.Title);
    data.append("Description", formData.Description);
    if (formData.blogImage) data.append("image", formData.blogImage); 

    await axios.put(`${API_BASE_URL}/api/blog/blogs/${id}`, data, {
       withCredentials: true,
    });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Update Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Title"
          value={formData.Title}
          className="w-full p-2 border"
          onChange={handleChange}
          required
        />
        <textarea
          name="Description"
          value={formData.Description}
          className="w-full p-2 border"
          rows={5}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="blogImage"
          className="w-full"
          onChange={handleChange}
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
