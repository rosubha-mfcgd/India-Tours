import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import TourModal from "./TourModal";
import { getTours, deleteTour } from "../../apiconfig/tourApi";
import { getImage } from "../../apiconfig/imageDetailsApi";
import { getStates } from "../../apiconfig/stateApi";
import { getCities } from "../../apiconfig/cityApi"; // <-- fetch all cities
import { AuthContext } from "../../context/AuthContext";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function TourDashboard() {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletedTourDesc, setDeletedTourDesc] = useState("");

  // Filters
  const [states, setStates] = useState([]);
  const [allCities, setAllCities] = useState([]); // all cities from backend
  const [cities, setCities] = useState([]);       // filtered cities for dropdown
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // ---------------- Fetch tours
  const fetchTours = async () => {
    try {
      const res = await getTours();
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Fetch states
  const fetchStates = async () => {
    try {
      const res = await getStates();
      setStates(res.data);
    } catch (err) {
      console.error("Failed to fetch states", err);
    }
  };

  // ---------------- Fetch all cities on initial load
  const fetchCities = async () => {
    try {
      const res = await getCities();
      setAllCities(res.data);
      setCities(res.data); // default show all cities
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  };

  // ---------------- Fetch images
  const fetchImageBlob = async (tour) => {
    if (!tour.image?.fileId) return;
    try {
      const res = await getImage(tour.image.fileId);
      const url = URL.createObjectURL(res.data);
      setImageMap((prev) => ({ ...prev, [tour._id]: url }));
    } catch (err) {
      console.error("Image fetch failed", err);
    }
  };

  // ---------------- Effects
  useEffect(() => {
    fetchTours();
    fetchStates();
    fetchCities();
  }, [reloadKey]);

  useEffect(() => {
    tours.forEach(fetchImageBlob);
    return () => Object.values(imageMap).forEach(URL.revokeObjectURL);
  }, [tours]);

  // ---------------- Filter cities locally when state changes
  useEffect(() => {
    if (selectedState) {
      setCities(allCities.filter((c) => c.state._id === selectedState));
    } else {
      setCities(allCities);
    }
    setSelectedCity(""); // reset city when state changes
  }, [selectedState, allCities]);

  // ---------------- Apply filters locally
  useEffect(() => {
    let filtered = [...tours];
    if (selectedState)
      filtered = filtered.filter((t) => t.stateId?._id === selectedState);
    if (selectedCity)
      filtered = filtered.filter((t) => t.cityId?._id === selectedCity);
    setFilteredTours(filtered);
  }, [tours, selectedState, selectedCity]);

  // ---------------- Delete tour
  const confirmDeleteTour = async () => {
    if (!tourToDelete) return;
    try {
      await deleteTour(tourToDelete._id);
      setDeletedTourDesc(tourToDelete.description);
      setDeleteModalOpen(true);
      setConfirmDeleteOpen(false);
      setTourToDelete(null);
      setReloadKey((k) => k + 1);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ---------------- Handlers
  const handleEdit = (tour) => {
    setEditingTour(tour);
    setOpenModal(true);
  };

  // ---------------- Render
  return (
    <Box sx={{ p: 2 }}>
      {/* Header + Filters */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }} spacing={2}>
        <Typography variant="h4">Tours Dashboard</Typography>
        <Button variant="contained" onClick={() => { setEditingTour(null); setOpenModal(true); }}>
          Create Tour
        </Button>
      </Stack>

      {/* State + City Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>State</InputLabel>
          <Select value={selectedState} label="State" onChange={(e) => setSelectedState(e.target.value)}>
            <MenuItem value=""><em>All States</em></MenuItem>
            {states.map((s) => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>City</InputLabel>
          <Select value={selectedCity} label="City" onChange={(e) => setSelectedCity(e.target.value)} disabled={cities.length === 0}>
            <MenuItem value=""><em>All Cities</em></MenuItem>
            {cities.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>

      {/* Tour List */}
      <Stack spacing={2}>
        {filteredTours.map((tour) => (
          <Card key={tour._id} sx={{ display: "flex", flexDirection: "row" }}>
            <CardContent sx={{ flex: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{tour.description}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={() => handleEdit(tour)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => { setTourToDelete(tour); setConfirmDeleteOpen(true); }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Operator: {tour.tourOperatorName || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                City: {tour.cityId?.name || "-"} | State: {tour.stateId?.name || "-"}
              </Typography>
              <Typography variant="body2">Trip Length: {tour.tripLength} | Nights: {tour.nights} | Days: {tour.days}</Typography>
              <Typography variant="body2">
                Package Cost: {new Intl.NumberFormat("en-IN", { style: "currency", currency: tour.currency || "INR" }).format(tour.packageCost)}
              </Typography>
              <Typography variant="body2">Max Tourist: {tour.maxTourist} | Seats Left: {tour.seatsLeft}</Typography>
              <Typography variant="body2">Tour Type: {tour.tourType}</Typography>
              <Typography variant="body2">
                Dates: {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>

            {imageMap[tour._id] && (
              <CardMedia component="img" sx={{ width: 160, height: "100%", objectFit: "cover", borderRadius: 1 }} image={imageMap[tour._id]} alt={tour.description} />
            )}
          </Card>
        ))}
      </Stack>

      {/* Tour Modal */}
      {openModal && (
        <TourModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => setReloadKey((k) => k + 1)}
          tourOperatorId={user?._id}
          editingTour={editingTour}
        />
      )}

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        open={confirmDeleteOpen}
        tourDescription={tourToDelete?.description || ""}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDeleteTour}
      />

      {/* Delete Success Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        tourDescription={deletedTourDesc}
        onClose={() => setDeleteModalOpen(false)}
      />
    </Box>
  );
}
