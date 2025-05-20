import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);


  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/blog/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlog(res.data.blog);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{blog.Title}</h1>
      <img src={`http://localhost:8000/${blog.blogImage}`} alt={blog.Title} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="text-gray-700 text-lg">{blog.Description}</p>
    </div>
  );
};

export default ViewBlog;
