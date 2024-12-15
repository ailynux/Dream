import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Debug logging
    console.log("Attempting login with:", {
      username,
      passwordHash: password
    });

    try {
      const response = await axios.post(
        "http://localhost:5162/api/auth/login",
        {
          username,
          passwordHash: password // Sending raw password to match db records
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Login response:", response.data);
      const { token, userId } = response.data;

      if (userId) {
        onLogin(token, userId);
        navigate("/dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError(
        err.response?.data || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        margin="normal"
        error={!!error}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
        error={!!error}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
      >
        Login
      </Button>
      <Box mt={2}>
        <RouterLink to="/register">Don't have an account? Register</RouterLink>
      </Box>
    </Box>
  );
};

export default LoginForm;
