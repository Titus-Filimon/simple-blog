import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/pages/LoginPage";
import BlogPage from "./components/pages/BlogPage";
import CMSPage from "./components/pages/CMSPage";
import PostDetail from "./components/BlogPostPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to set authentication status based on localStorage
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("authToken") !== null);
  }, []);

  // Function to update authentication state
  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/admin/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <CMSPage /> : <Navigate to="/admin/login" />}
        />
        <Route path="*" element={<Navigate to="/blog" />} />
      </Routes>
    </Router>
  );
}

export default App;
