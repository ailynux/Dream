import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  CircularProgress
} from "@mui/material";

const CATEGORIES = [
  "Adventure",
  "Nightmare",
  "Lucid",
  "Fantasy",
  "Recurring",
  "Prophetic"
];

const DreamForm = ({ userId, onDreamAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dreamDate, setDreamDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!userId) {
      setError("No user ID available. Please log in again.");
      setLoading(false);
      return;
    }

    const dream = {
      userId,
      title,
      description,
      category,
      dreamDate: new Date(dreamDate).toISOString()
    };

    try {
      await axios.post("http://localhost:5162/api/dreams", dream);
      onDreamAdded();

      // Clear form
      setTitle("");
      setDescription("");
      setCategory("");
      setDreamDate(new Date().toISOString().split("T")[0]);
    } catch (err) {
      console.error("Error adding dream:", err.response?.data || err.message);
      setError(err.response?.data || "Failed to add dream");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 1
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        margin="normal"
        multiline
        rows={4}
      />

      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        required
        margin="normal"
      >
        {CATEGORIES.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Dream Date"
        type="date"
        value={dreamDate}
        onChange={(e) => setDreamDate(e.target.value)}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading || !userId || !title || !description || !category}
      >
        {loading ? <CircularProgress size={24} /> : "Add Dream"}
      </Button>
    </Box>
  );
};

export default DreamForm;
