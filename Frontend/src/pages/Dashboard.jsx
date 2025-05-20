import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/blog/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, []);


  const handleCreateBlog = () => {
    navigate("/blogs/create");
  };

  const handleView = (id) => {
    navigate(`/blogs/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/blogs/update/${id}`);
  };

  const handleDelete = async (id) => {
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/blog/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Blog Dashboard</h2>
            <button
              onClick={handleCreateBlog}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              + Create Blog
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Options</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} className="border-t">
                    <td className="px-4 py-2">{blog.Title}</td>
                    <td className="px-4 py-2">
                      <img
                        src={`http://localhost:8000/${blog.blogImage}`}
                        alt={blog.blogImage}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                        {blog.Description
                          ? blog.Description.length > 100
                           ? blog.Description.substring(0, 20) + "..."
                           : blog.Description
                            : "No description"}
                                </td>

                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleView(blog._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(blog._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No blogs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
