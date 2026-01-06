import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import { getTours } from "../apiconfig/tourApi";
import { getBookings } from "../apiconfig/bookingApi";

export default function Dashboard() {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tourBookingData, setTourBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Fetch all tours
        const toursRes = await getTours();
        const allTours = toursRes.data || [];
        setTours(allTours);

        // 2️⃣ Fetch all bookings
        const bookingsRes = await getBookings();
        const allBookings = bookingsRes.data || [];
        setBookings(allBookings);

        // 3️⃣ Compute bookings per tour
        const bookingCounts = {};
        allBookings.forEach((b) => {
          const tourIdStr =  b.tourId?._id?.toString() || b.tourId?.toString();
          bookingCounts[tourIdStr] = (bookingCounts[tourIdStr] || 0) + 1;
        });

        const tourData = allTours.map((tour) => {
          const tourIdStr = tour._id.toString(); // Convert to string
          return {
            tourId: tour._id,
            description: tour.description,
            packageCost: tour.packageCost,
            currency: tour.currency || "INR",
            bookingsCount: bookingCounts[tourIdStr] || 0,
          };
        });
        console.log("Tour booking data:", tourData);
      setTourBookingData(tourData);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 10 }}>
        <CircularProgress />
      </Grid>
    );
  }

   return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Total Tours & Bookings Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Tours */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={6}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total Tours</Typography>
              <Typography variant="h3" color="primary">
                {tours.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Number of tours available
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Bookings */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={6}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h3" color="secondary">
                {bookings.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total bookings made
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bookings per Tour Table */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Bookings by Tour
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <Table
          sx={{
            minWidth: 650,
            border: 1,
            borderColor: "divider",
            borderStyle: "dotted",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "hidden",
          }}
        >
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Tour Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Total Bookings</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tourBookingData.map((tour, idx) => (
              <TableRow
                key={tour.tourId}
                sx={{
                  backgroundColor: idx % 2 === 0 ? "grey.100" : "white",
                  "&:hover": { backgroundColor: "grey.200" },
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{tour.description}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: tour.currency,
                  }).format(tour.packageCost)}
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{tour.bookingsCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

