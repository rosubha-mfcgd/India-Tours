import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { getTours, bookTour as bookTourApi } from "../../apiconfig/tourApi";
import { getImage } from "../../apiconfig/imageDetailsApi";
import { getStates } from "../../apiconfig/stateApi";
import { getCities } from "../../apiconfig/cityApi";
import { getCategories } from "../../apiconfig/categoryApi";

import TourModal from "../Tours/TourModal";
import BookTourModal from "./BookTourModal";
import BookingConfirmationModal from "./BookingConfirmationModal";

export default function TourMarketplace() {
  // ---------------- Data
  const [tours, setTours] = useState([]);
  const [imageMap, setImageMap] = useState({});

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [categories, setCategories] = useState([]);

  // ---------------- Filters
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ---------------- Modals
  const [viewTour, setViewTour] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [bookTour, setBookTour] = useState(null);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  // ---------------- Fetch tours
  const fetchTours = async () => {
    try {
      const res = await getTours();
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

  // ---------------- Booking
  const handleBookTour = async (bookingData) => {
    try {
      const res = await bookTourApi(bookTour._id, bookingData);

      setBookTour(null);
      setConfirmationData(res.data.booking);
      setConfirmationOpen(true);

      fetchTours();
    } catch (err) {
      console.error("Booking failed", err);
      alert(err.response?.data?.error || "Booking failed");
    }
  };

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

  // ---------------- Effects
  useEffect(() => {
    fetchTours();
    fetchFilters();
  }, []);

  useEffect(() => {
    tours.forEach(fetchImageBlob);
    return () => Object.values(imageMap).forEach(URL.revokeObjectURL);
  }, [tours]);

  // ---------------- Filter cities by state
  useEffect(() => {
    if (selectedState) {
      setCities(allCities.filter((c) => c.state?._id === selectedState));
    } else {
      setCities(allCities);
    }
    setSelectedCity("");
  }, [selectedState, allCities]);

  // ---------------- Filter tours
  const filteredTours = tours.filter((tour) => {
    if (selectedState && tour.state?._id !== selectedState) return false;
    if (selectedCity && tour.city?._id !== selectedCity) return false;
    if (selectedCategory && tour.category?._id !== selectedCategory) return false;
    return true;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        p: 2,
        minHeight: "100vh",
        bgcolor: "#f0f0f0",
      }}
    >
      {/* LEFT – FILTERS */}
      <Box
        sx={{
          width: { xs: "100%", md: 300 },
          bgcolor: "white",
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        {/* Category */}
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* State */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>State</InputLabel>
          <Select
            value={selectedState}
            label="State"
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <MenuItem value="">
              <em>All States</em>
            </MenuItem>
            {states.map((state) => (
              <MenuItem key={state._id} value={state._id}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* City */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            label="City"
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city._id} value={city._id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* RIGHT – TOURS */}
      <Box sx={{ flexGrow: 1 }}>
        <Box mb={2}>
          <Typography variant="h5" fontWeight={600}>
            Book Tours 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explore exciting tours curated just for you
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {filteredTours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tour._id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {imageMap[tour._id] && (
                  <CardMedia
                    component="img"
                    height={160}
                    image={imageMap[tour._id]}
                    alt={tour.description}
                  />
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {tour.description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {tour.city?.name}, {tour.state?.name}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: tour.currency || "INR",
                    }).format(tour.packageCost)}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontWeight: 600, color: "primary.main" }}
                  >
                    Seats Left: {tour.seatsLeft}
                  </Typography>

                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={1}
                    sx={{ mt: 2 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setViewTour(tour);
                        setViewModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setBookTour(tour)}
                      disabled={tour.seatsLeft <= 0}
                    >
                      Book Tour
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* MODALS */}
      {viewModalOpen && viewTour && (
        <TourModal
          open={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setViewTour(null);
          }}
          editingTour={viewTour}
          readOnly
        />
      )}

      {bookTour && (
        <BookTourModal
          open={Boolean(bookTour)}
          onClose={() => setBookTour(null)}
          tour={bookTour}
          onConfirm={handleBookTour}
        />
      )}

      <BookingConfirmationModal
        open={confirmationOpen}
        booking={confirmationData}
        onClose={() => {
          setConfirmationOpen(false);
          setConfirmationData(null);
        }}
      />
    </Box>
  );
}
