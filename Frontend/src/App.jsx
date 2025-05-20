import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import ViewBlog from "./pages/ViewBlog";
import ProtectedRoute from "./Utils/protectedRoutes.jsx";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // example check

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/create"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/update/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/view/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ViewBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
