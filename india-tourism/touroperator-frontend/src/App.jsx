import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import { AuthContext } from "./context/AuthContext";

/* Public pages */
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

/* Core pages */
import Dashboard from "./pages/Dashboard";
import ItineraryBuilder from "./pages/Itinerary/ItineraryBuilder";
import Checkout from "./pages/Payments/Checkout";
import Tours from "./pages/Tours/TourDashboard";
/* Market place */
import Marketplace from "./pages/Marketplace/Marketplace";

/* Admin pages */
import TourOperatorsPage from "./pages/TourOperators/TourOperatorsPage";
import CategoriesPage from "./pages/Categories/Categories";

/* Styles */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  const { user } = useContext(AuthContext);

  // Compute greeting based on time
  const hour = new Date().getHours();
  let greeting = "Hello";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  // Map roleID to role name
  const roleMap = {
    1: "SUPER ADMIN",
    2: "Tour Operator",
    3: "User",
  };
  const roleName = user ? roleMap[user.roleID] || "User" : "";

  return (
    <>
      <Navbar />

      {/* Greeting */}
      {user && (
        <Box sx={{ mb: 2, p: 1 }}>
          <Typography variant="h5">{`${greeting}, ${user.username}!`}</Typography>
          <Typography variant="body2" color="textSecondary">{`Role: ${roleName}`}</Typography>
        </Box>
      )}

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

           {/* ================= MARKET PLACE ================= */}
          <Route
            path="/market-place"
            element={
              <ProtectedRoute>
                <Marketplace />
              </ProtectedRoute>
            }
          />

          {/* ================= TOUR MANAGEMENT ================= */}
          <Route
            path="/tours"
            element={
              <ProtectedRoute>
                <Tours />
              </ProtectedRoute>
            }
          />

          {/* ================= ITINERARY ================= */}
          <Route
            path="/itinerary"
            element={
              <RoleRoute allowedRoles={[1, 2]}>
                <ItineraryBuilder />
              </RoleRoute>
            }
          />

          {/* ================= SUPER ADMIN ================= */}
          <Route
            path="/tour-operators"
            element={
              <ProtectedRoute>
                <TourOperatorsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />

          {/* ================= PAYMENTS ================= */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* ================= AUTHENTICATED ROUTES ================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}
