import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      handleLogout();
      navigate("/admin/login");
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
            Simple Blog
          </Link>
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit">
            <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </Button>
          {isAuthenticated && (
            <Button color="inherit">
              <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
                Dashboard
              </Link>
            </Button>
          )}
          <Button color="inherit" onClick={handleAuthAction}>
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
