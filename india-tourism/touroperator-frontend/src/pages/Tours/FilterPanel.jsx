import React, { useEffect, useState } from "react";
import { getStates } from "../../apiconfig/stateApi";
import { getCitiesByState } from "../../apiconfig/cityApi"; // updated import
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

function FilterPanel({ onFilter }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch all states on mount
  useEffect(() => {
    fetchStates();
  }, []);

  // Fetch cities whenever selectedState changes
  useEffect(() => {
    if (selectedState) {
      fetchCitiesForState(selectedState);
      console.log("Fetching cities for state:", selectedState);
      setSelectedCity(""); // reset city selection
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  // Fetch all states
  const fetchStates = async () => {
    try {
      const res = await getStates();
      setStates(res.data);
    } catch (err) {
      console.error("Failed to fetch states:", err);
    }
  };

  // Fetch cities for a specific state
  const fetchCitiesForState = async (stateId) => {
    try {
      const res = await getCitiesByState(stateId); // calls /api/cities/:stateId
      setCities(res.data);
    } catch (err) {
      console.error("Failed to fetch cities for state:", err);
      setCities([]);
    }
  };

  const handleFilter = () => {
    onFilter({ stateId: selectedState, cityId: selectedCity });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* State Select */}
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          value={selectedState}
          label="State"
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <MenuItem value="">
            <em>Select State</em>
          </MenuItem>
          {states.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* City Select */}
      <FormControl fullWidth>
        <InputLabel>City</InputLabel>
        <Select
          value={selectedCity}
          label="City"
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <MenuItem value="">
            <em>Select City</em>
          </MenuItem>
          {cities.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Apply Filter Button */}
      <Button variant="contained" fullWidth onClick={handleFilter}>
        Apply Filter
      </Button>
    </Box>
  );
}

export default FilterPanel;
