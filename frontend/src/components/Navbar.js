import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Simple Blog
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/cms" style={{ textDecoration: 'none', color: 'inherit' }}>
              CMS
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              Login
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
