import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5162/api/auth/register", {
        username,
        passwordHash: password
      });
      onRegister();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Register
      </Button>
      <Box mt={2}>
        <Link component={RouterLink} to="/login">
          Already have an account? Login
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
