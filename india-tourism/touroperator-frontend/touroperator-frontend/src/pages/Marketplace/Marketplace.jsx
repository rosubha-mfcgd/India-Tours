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
import TourModal from "../Tours/TourModal";
import BookTourModal from "./BookTourModal";
import BookingConfirmationModal from "./BookingConfirmationModal";

export default function TourMarketplace() {
  const [tours, setTours] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [states, setStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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

  // ---------------- Book tour handler
  const handleBookTour = async (bookingData) => {
    try {
      const res = await bookTourApi(bookTour._id, bookingData);
      console.log("Booking success:", res.data);

      // Close booking modal
      setBookTour(null);

      // Prepare confirmation modal data
      setConfirmationData(res.data.booking);
      setConfirmationOpen(true);

      // Refresh tours so seatsLeft updates
      fetchTours();
    } catch (err) {
      console.error("Booking failed", err);
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  // ---------------- Fetch filters (states & cities)
  const fetchFilters = async () => {
    try {
      const stateRes = await getStates();
      setStates(stateRes.data || []);

      const cityRes = await getCities();
      setAllCities(cityRes.data || []);
      setCities(cityRes.data || []);
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

  // ---------------- Filter cities when state changes
  useEffect(() => {
    if (selectedState) {
      setCities(allCities.filter((c) => c.state._id === selectedState));
    } else {
      setCities(allCities);
    }
    setSelectedCity("");
  }, [selectedState, allCities]);

  // ---------------- Filter tours locally
  const filteredTours = tours.filter((t) => {
    if (selectedState && t.stateId?._id !== selectedState) return false;
    if (selectedCity && t.cityId?._id !== selectedCity) return false;
    return true;
  });

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2, minHeight: "100vh", bgcolor: "#f0f0f0" }}>
      {/* LEFT COLUMN – FILTER PANEL */}
      <Box sx={{ width: 300, bgcolor: "white", borderRadius: 2, p: 2, boxShadow: 1, flexShrink: 0 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>State</InputLabel>
          <Select value={selectedState} label="State" onChange={(e) => setSelectedState(e.target.value)}>
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

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>City</InputLabel>
          <Select value={selectedCity} label="City" onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
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

      {/* RIGHT COLUMN – MARKETPLACE */}
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
              <Card sx={{ height: "100%" }}>
                {imageMap[tour._id] && (
                  <CardMedia component="img" height="160" image={imageMap[tour._id]} alt={tour.description} />
                )}

                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {tour.description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {tour.cityId?.name}, {tour.stateId?.name}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: tour.currency || "INR" }).format(tour.packageCost)}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, color: "primary.main" }}>
                    Seats Left: {tour.seatsLeft}
                  </Typography>

                  <Box display="flex" gap={1} sx={{ mt: 2 }}>
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
                      disabled={tour.seatsLeft <= 0} // disable if no seats
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

      {/* VIEW DETAILS MODAL */}
      {viewModalOpen && viewTour && (
        <TourModal open={viewModalOpen} onClose={() => { setViewModalOpen(false); setViewTour(null); }} editingTour={viewTour} readOnly />
      )}

        {/* BOOK TOUR MODAL */}
        {bookTour && (
          <BookTourModal open={Boolean(bookTour)} onClose={() => setBookTour(null)} tour={bookTour} onConfirm={handleBookTour} />
        )}

      {/* BOOKING CONFIRMATION MODAL */}
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
