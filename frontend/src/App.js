import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import BlogPage from "./components/BlogPage";
import CMSPage from "./components/CMSPage";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
  };

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/cms"
            element={
              isAuthenticated() ? (
                <CMSPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/blog" />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
