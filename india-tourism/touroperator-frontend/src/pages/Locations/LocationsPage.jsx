import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
  Collapse,
  IconButton,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getStates } from '../../apiconfig/stateApi';
import { getCitiesByState, createCity } from '../../apiconfig/cityApi'; // use getCityByState

export default function LocationsPage() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [locations, setLocations] = useState([]);
  const [newLocations, setNewLocations] = useState(['']);
  const [openCollapse, setOpenCollapse] = useState(true);

  useEffect(() => {
    getStates()
      .then(res => setStates(res.data || []))
      .catch(err => console.error('Failed to fetch states:', err));
  }, []);

  // Fetch cities for the selected state
  useEffect(() => {
    if (selectedState) {
      
         getCitiesByState(selectedState)
        .then(res => setLocations(res.data || []))
        .catch(err => console.error('Failed to fetch cities for state:', err));
    } else {
      setLocations([]);
    }
  }, [selectedState]);

  const handleAddLocationField = () => {
    setNewLocations(prev => [...prev, '']);
  };

  const handleLocationChange = (index, value) => {
    const updated = [...newLocations];
    updated[index] = value;
    setNewLocations(updated);
  };

  const handleSaveLocations = async () => {
    if (!selectedState) return;
    const validLocations = newLocations.filter(l => l.trim() !== '');

    try {
     
      let data = {cities:validLocations, state: selectedState};
       console.log('here in handleSaveLocations and data...',selectedState,data);
      createCity(data).then(
        updatedCity =>{
      
        console.log('updatedCity....',updatedCity);
         setNewLocations(['']);
          //  console.log('data....',data);
               // Refresh list after saving
      getCitiesByState(selectedState).then(
          updatedCityList=>{
            console.log('updatedCityList data....',updatedCityList.data)
              setLocations(updatedCityList.data || []);
                alert('Locations saved successfully');
          }).catch((error)=>{
            console.log('Failed to save locations...',error);
          alert('Error saving locations');
        })
      }).catch((error)=>{

          setNewLocations(['']);
           console.log('Failed to save locations:',error.stack);
           alert('Error saving locations');
      });
      } catch (err) {
      console.error('Failed to save locations:', err);
      console.log(err.stack);
      alert('Error saving locations');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>Manage Locations</Typography>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <Select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Select a State</MenuItem>
          {states.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
        </Select>
      </Stack>

      {selectedState && (
        <Stack direction="row" spacing={2}>
          {/* Left: List of existing locations */}
          <Paper sx={{ flex: 1, p: 2, minHeight: 300 }}>
            <Typography variant="h6" mb={1}>Existing Locations</Typography>
            <Divider sx={{ mb: 1 }} />
            {locations.length === 0 ? (
              <Typography>No locations found</Typography>
            ) : (
              <Stack spacing={1}>
                {locations.map(loc => (
                  <Typography key={loc._id}>• {loc.name}</Typography>
                ))}
              </Stack>
            )}
          </Paper>

          {/* Right: Add new locations */}
          <Paper sx={{ flex: 1, p: 2, minHeight: 300 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Typography variant="h6">Add Locations</Typography>
              <IconButton onClick={() => setOpenCollapse(prev => !prev)}>
                {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Stack>

            <Collapse in={openCollapse}>
              <Stack spacing={2}>
                {newLocations.map((loc, idx) => (
                  <TextField
                    key={idx}
                    label={`Location ${idx + 1}`}
                    value={loc}
                    onChange={e => handleLocationChange(idx, e.target.value)}
                    fullWidth
                  />
                ))}
                <Button variant="outlined" onClick={handleAddLocationField}>Add Another Location</Button>
                <Button variant="contained" onClick={handleSaveLocations}>Save Locations</Button>
              </Stack>
            </Collapse>
          </Paper>
        </Stack>
      )}
    </Box>
  );
}
