import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });

      if (response.status === 200) {
        // Store auth token in local storage for use in authenticated requests
        localStorage.setItem('authToken', response.data.token);
        // Redirect to the CMS page
        navigate('/cms');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginPage;
