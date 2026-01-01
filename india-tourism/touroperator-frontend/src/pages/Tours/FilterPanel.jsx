import React, { useEffect, useState } from "react";
import { getStates } from "../../apiconfig/stateApi";
import { getCities } from "../../apiconfig/cityApi";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

function FilterPanel({ onFilter }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
      setSelectedCity("");
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  const fetchStates = async () => {
    const res = await getStates();
    setStates(res.data);
  };

  const fetchCities = async (stateId) => {
    const res = await getCities();
    const filtered = res.data.filter((city) => city.state._id === stateId);
    setCities(filtered);
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
