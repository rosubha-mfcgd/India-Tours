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
import { getCities } from "../../apiconfig/cityApi";
import { getCategories } from "../../apiconfig/categoryApi";
import { AuthContext } from "../../context/AuthContext";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function TourDashboard() {
  const { user } = useContext(AuthContext);

  // ---------------- Data
  const [tours, setTours] = useState([]);
  const [imageMap, setImageMap] = useState({});

  // ---------------- Modals / actions
  const [openModal, setOpenModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletedTourDesc, setDeletedTourDesc] = useState("");

  // ---------------- Filters data
  const [states, setStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  // ---------------- Filter selections
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ---------------- Fetch filters
  const fetchFilters = async () => {
    try {
      const [stateRes, cityRes, categoryRes] = await Promise.all([
        getStates(),
        getCities(),
        getCategories(),
      ]);
      setStates(stateRes.data || []);
      setAllCities(cityRes.data || []);
      setCities(cityRes.data || []);
      setCategories(categoryRes.data || []);
    } catch (err) {
      console.error("Failed to fetch filters", err);
    }
  };

  // ---------------- Fetch tours
const fetchTours = async () => {
  try {
    const params = {};
    if (selectedState) params.stateId = selectedState;
    if (selectedCity) params.cityId = selectedCity;
    if (selectedCategory) params.categoryId = selectedCategory;

    console.log("Sending params:", params);
    
    const res = await getTours(params);
    setTours(res.data || []);
  } catch (err) {
    console.error("Failed to fetch tours", err);
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
  // Initial load: filters
  useEffect(() => {
    fetchFilters();
  }, []);

  // Fetch tours whenever any filter changes OR reloadKey changes
  useEffect(() => {
    fetchTours();
  }, [selectedState, selectedCity, selectedCategory, reloadKey]);

  // Fetch images
  useEffect(() => {
    tours.forEach(fetchImageBlob);
    return () => Object.values(imageMap).forEach(URL.revokeObjectURL);
  }, [tours]);

  // ---------------- Filter cities by selected state
  useEffect(() => {
    if (selectedState) {
      const filteredCities = allCities.filter((c) => c.state?._id === selectedState);
      setCities(filteredCities);
      if (!filteredCities.some((c) => c._id === selectedCity)) {
        setSelectedCity(""); // reset city if it does not belong to new state
      }
    } else {
      setCities(allCities);
    }
  }, [selectedState, allCities]);

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

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setOpenModal(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Tours Dashboard</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditingTour(null);
            setOpenModal(true);
          }}
        >
          Create Tour
        </Button>
      </Stack>

      {/* Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>State</InputLabel>
          <Select
            value={selectedState}
            label="State"
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <MenuItem value="">
              <em>All States</em>
            </MenuItem>
            {states.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            label="City"
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={cities.length === 0}
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {cities.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Tour List */}
      <Stack spacing={2}>
        {tours.map((tour) => (
          <Card key={tour._id} sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{tour.description}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={() => handleEdit(tour)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setTourToDelete(tour);
                      setConfirmDeleteOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Operator: {tour.tourOperatorName || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {tour.category?.name || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                City: {tour.city?.name || "-"} | State: {tour.state?.name || "-"}
              </Typography>
              <Typography variant="body2">
                Trip Length: {tour.tripLength} | Nights: {tour.nights} | Days: {tour.days}
              </Typography>
              <Typography variant="body2">
                Package Cost:{" "}
                {new Intl.NumberFormat("en-IN", { style: "currency", currency: tour.currency || "INR" }).format(
                  tour.packageCost
                )}
              </Typography>
              <Typography variant="body2">
                Max Tourist: {tour.maxTourist} | Seats Left: {tour.seatsLeft}
              </Typography>
              <Typography variant="body2">
                Dates: {new Date(tour.startDate).toLocaleDateString()} – {new Date(tour.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>

            {imageMap[tour._id] && (
              <CardMedia
                component="img"
                sx={{ width: 160, objectFit: "cover" }}
                image={imageMap[tour._id]}
                alt={tour.description}
              />
            )}
          </Card>
        ))}
      </Stack>

      {/* Modals */}
      {openModal && (
        <TourModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => setReloadKey((k) => k + 1)}
          tourOperatorId={user?._id}
          editingTour={editingTour}
        />
      )}

      <DeleteConfirmModal
        open={confirmDeleteOpen}
        tourDescription={tourToDelete?.description || ""}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDeleteTour}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        tourDescription={deletedTourDesc}
        onClose={() => setDeleteModalOpen(false)}
      />
    </Box>
  );
}
