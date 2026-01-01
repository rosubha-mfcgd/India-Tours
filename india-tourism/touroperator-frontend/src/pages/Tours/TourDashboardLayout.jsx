import React, { useState } from "react";
import FilterPanel from "./FilterPanel";
import TourDashboard from "./TourDashboard";

// MUI
import { Box } from "@mui/material";

function TourDashboardLayout() {
  const [filters, setFilters] = useState({});

  // Callback: updates filters when user clicks Apply Filter
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Filters applied:", newFilters); // for debugging
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        minHeight: "100vh",
        bgcolor: "#f0f0f0",
      }}
    >
      {/* Left Column: Filter Panel */}
      <Box
        sx={{
          width: 300,
          bgcolor: "white",
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          flexShrink: 0, // ensure it doesn't collapse
        }}
      >
        <FilterPanel onFilter={handleFilterChange} />
      </Box>

      {/* Right Column: Tour Dashboard */}
      <Box sx={{ flexGrow: 1 }}>
        <TourDashboard filters={filters} />
      </Box>
    </Box>
  );
}

export default TourDashboardLayout;
