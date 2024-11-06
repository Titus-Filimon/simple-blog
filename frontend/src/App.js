import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import BlogPage from "./components/BlogPage";
import CMSPage from "./components/CMSPage";

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
    console.log('Logged in');
    
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    console.log('Logged out');
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/admin/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/blog" element={<BlogPage />} />
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
