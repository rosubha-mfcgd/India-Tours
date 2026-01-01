import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Stack,
  Alert
} from "@mui/material";
import axiosClient from "../apiconfig/axiosClient";
import { AuthContext } from "../context/AuthContext";

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    location: "",
    city: "",
    state: "",
    categoryID: "",
    triplength: "",
    startDate: "",
    endDate: "",
    package_cost: "",
    max_tourist: "",
    seats_left: "",
    tourType: "domestic",
    ticket_cost: "",
    desc: "",
    image: "",
    itinerary: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axiosClient.get("/tours", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setTours(res.data);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleOpenModal = () => {
    setForm({
      location: "",
      city: "",
      state: "",
      categoryID: "",
      triplength: "",
      startDate: "",
      endDate: "",
      package_cost: "",
      max_tourist: "",
      seats_left: "",
      tourType: "domestic",
      ticket_cost: "",
      desc: "",
      image: "",
      itinerary: ""
    });
    setError(null);
    setSuccess(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Autofill city/state if location changes (example)
    if (name === "location") {
      // In real app, fetch city/state from API
      if (value.toLowerCase() === "shimla") {
        setForm((prev) => ({ ...prev, city: "Shimla", state: "Himachal Pradesh", location: value }));
      } else {
        setForm((prev) => ({ ...prev, city: "", state: "", location: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Only roleID 1 or 2 can create tour
      if (![1, 2].includes(user.roleID)) {
        setError("You do not have permission to create tours.");
        return;
      }

      const res = await axiosClient.post("/tours", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setSuccess("Tour created successfully!");
      setTours((prev) => [...prev, res.data]); // Update tours list
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create tour.");
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 10 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Tours Available Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={3}
            sx={{ cursor: "pointer" }}
            onClick={handleOpenModal}
          >
            <CardContent>
              <Typography variant="h6">Tours Available</Typography>
              <Typography variant="h3" color="primary">
                {tours.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Click to add a new tour
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Tour Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Add New Tour
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Category ID"
                name="categoryID"
                type="number"
                value={form.categoryID}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Trip Length"
                name="triplength"
                value={form.triplength}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Package Cost"
                name="package_cost"
                type="number"
                value={form.package_cost}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Max Tourists"
                name="max_tourist"
                type="number"
                value={form.max_tourist}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Seats Left"
                name="seats_left"
                type="number"
                value={form.seats_left}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                select
                label="Tour Type"
                name="tourType"
                value={form.tourType}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="domestic">Domestic</MenuItem>
                <MenuItem value="international">International</MenuItem>
              </TextField>
              <TextField
                label="Ticket Cost"
                name="ticket_cost"
                type="number"
                value={form.ticket_cost}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Description"
                name="desc"
                value={form.desc}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                required
              />
              <TextField
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Itinerary"
                name="itinerary"
                value={form.itinerary}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />
              <Button type="submit" variant="contained" fullWidth>
                Save Tour
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
