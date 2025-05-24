import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ Email: '', Password: '', ProfileImage: null });
  const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'ProfileImage') {
      setFormData({ ...formData, ProfileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('Email', formData.Email);
    data.append('Password', formData.Password);
    data.append('ProfileImage', formData.ProfileImage);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, data);
      alert('User created successfully')
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.user?.message || 'Registration Failed');
    }
  };

   const handleLogIn=()=>{
    navigate("/login")
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="Password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="ProfileImage" className="block text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            name="ProfileImage"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

         <button
              onClick={handleLogIn}
              className="bg-blue-600 text-white px-4 mt-3 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
      </form>
    </div>
  );
}

export default SignUp;
