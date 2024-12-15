import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Fab
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { format } from "date-fns";

const DreamDashboard = ({ userId }) => {
  const [dreams, setDreams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDream, setEditDream] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    dreamDate: new Date().toISOString().substring(0, 10)
  });

  const categories = ["Adventure", "Fantasy", "Nightmare", "Other"];

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5162/api/dreams/${userId}`
        );
        setDreams(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDreams();
    }
  }, [userId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDialogOpen = (dream = null) => {
    setEditDream(dream);
    setFormValues(
      dream || {
        title: "",
        description: "",
        category: "",
        dreamDate: new Date().toISOString().substring(0, 10)
      }
    );
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditDream(null);
  };

  const handleFormSubmit = async () => {
    try {
      if (editDream) {
        // Update dream
        await axios.put(
          `http://localhost:5162/api/dreams/${editDream.dreamId}`,
          formValues
        );
      } else {
        // Add new dream
        await axios.post(`http://localhost:5162/api/dreams`, {
          ...formValues,
          userId
        });
      }
      const response = await axios.get(
        `http://localhost:5162/api/dreams/${userId}`
      );
      setDreams(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      handleDialogClose();
    }
  };

  const handleDelete = async (dreamId) => {
    try {
      await axios.delete(`http://localhost:5162/api/dreams/${dreamId}`);
      setDreams(dreams.filter((dream) => dream.dreamId !== dreamId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteConfirm(null);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: "error.lighter",
          borderRadius: 1,
          color: "error.main"
        }}
      >
        Error: {error}
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {dreams.map((dream) => (
          <Grid item xs={12} sm={6} md={4} key={dream.dreamId}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: (theme) => theme.shadows[8]
                }
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {dream.title}
                </Typography>

                <Chip
                  label={dream.category}
                  size="small"
                  color="primary"
                  sx={{ mb: 2 }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    flex: 1
                  }}
                >
                  {dream.description}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    mt: "auto"
                  }}
                >
                  {format(new Date(dream.dreamDate), "MMM d, yyyy")}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <IconButton onClick={() => handleDialogOpen(dream)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setDeleteConfirm(dream.dreamId)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        onClick={() => handleDialogOpen()}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editDream ? "Edit Dream" : "Add Dream"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleFormChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Category"
            name="category"
            value={formValues.category}
            onChange={handleFormChange}
            select
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="dense"
            label="Dream Date"
            name="dreamDate"
            value={formValues.dreamDate}
            onChange={handleFormChange}
            type="date"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">
            {editDream ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this dream?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteConfirm)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DreamDashboard;
