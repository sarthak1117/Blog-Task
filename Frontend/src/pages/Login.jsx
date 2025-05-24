import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const handleLogin = async (e) => {
  e.preventDefault();

  if (!Email || !Password) {
    setError("All fields are required");
    return;
  }

  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      { Email, Password },
      { withCredentials: true }
    );

    console.log("Login response:", res); // ✅ Log whole response

    const { user } = res.data;

    if (!user) {
      setError("Login failed: user not returned");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/Dashboard");
  } catch (err) {
    console.error("Login error:", err);
    setError(err.response?.data?.message || "Login failed");
  }
};


  const handleSignUp=()=>{
    navigate("/signup")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
              onClick={handleSignUp}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              sign Up
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
