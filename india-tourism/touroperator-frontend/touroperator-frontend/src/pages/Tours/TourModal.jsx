import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { createTour, updateTour } from "../../apiconfig/tourApi";
import { getStates, createState } from "../../apiconfig/stateApi";
import { getCities, createCity } from "../../apiconfig/cityApi";

const initialForm = {
  description: "",
  stateId: "",
  cityId: "",
  packageCost: 0,
  currency: "INR",
  tourType: "Domestic",
  startDate: "",
  endDate: "",
  nights: 0,
  days: 0,
  maxTourist: 0,
  seatsLeft: 0,
};

export default function TourModal({ open, onClose, onSuccess, editingTour = null, readOnly = false }) {
  const { user } = useContext(AuthContext);
  const isViewMode = readOnly;
  const isEditMode = Boolean(editingTour) && !readOnly;

  const [form, setForm] = useState(initialForm);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addState, setAddState] = useState(false);
  const [addCity, setAddCity] = useState(false);
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- Prefill form
  useEffect(() => {
    if (!open) return;

    if (editingTour) {
      setForm({
        description: editingTour.description || "",
        stateId: editingTour.stateId?._id || "",
        cityId: editingTour.cityId?._id || "",
        packageCost: editingTour.packageCost || 0,
        currency: editingTour.currency || "INR",
        tourType: editingTour.tourType || "Domestic",
        startDate: editingTour.startDate?.slice(0, 10) || "",
        endDate: editingTour.endDate?.slice(0, 10) || "",
        nights: editingTour.nights || 0,
        days: editingTour.days || 0,
        maxTourist: editingTour.maxTourist || 0,
        seatsLeft: editingTour.seatsLeft || 0,
      });
    } else {
      setForm(initialForm);
      setCities([]);
      setAddState(false);
      setAddCity(false);
      setNewState("");
      setNewCity("");
    }
  }, [editingTour, open]);

  // ---------------- Load states
  useEffect(() => {
    if (!open) return;
    getStates().then(res => setStates(res.data));
  }, [open]);

  // ---------------- Load cities when state changes
  useEffect(() => {
    if (form.stateId) getCities(form.stateId).then(res => setCities(res.data));
    else setCities([]);
  }, [form.stateId]);

  // ---------------- Auto-calc days & nights
  useEffect(() => {
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      const diffDays = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 0);
      setForm(f => ({ ...f, days: diffDays + 1, nights: diffDays }));
    }
  }, [form.startDate, form.endDate]);

const handleChange = e => {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: ["maxTourist", "nights", "days", "packageCost"].includes(name) ? Number(value) : value,
  }));
};


  // ---------------- Submit
  const handleSubmit = async () => {
    if (isViewMode) return;
    setLoading(true);

    try {
      let stateId = form.stateId;
      let cityId = form.cityId;

      // Add new state
      if (addState && newState.trim()) {
        const stateRes = await createState({ name: newState.trim() });
        stateId = stateRes.data._id;
        setStates(prev => [...prev, stateRes.data]);
      }

      // Add new city
      if (addCity && newCity.trim()) {
        if (!stateId) throw new Error("State must be selected/created before adding city");
        const cityRes = await createCity({ name: newCity.trim(), state: stateId });
        cityId = cityRes.data._id;
        setCities(prev => [...prev, cityRes.data]);
      }

      // Prepare payload
      let payload = {};

      if (!isEditMode) {
        payload = { ...form, stateId, cityId, tourOperatorId: user._id };
      } else {
        // Only include updated fields
        Object.keys(form).forEach(key => {
          if (form[key] !== editingTour[key]) {
            payload[key] = form[key];
          }
        });
        payload.stateId = stateId;
        payload.cityId = cityId;
      }

      // Send request
      if (isEditMode) await updateTour(editingTour._id, payload);
      else await createTour(payload);

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isViewMode ? "Tour Details" : isEditMode ? "Edit Tour" : "Create Tour"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth disabled={readOnly} />

          <FormControlLabel control={<Switch checked={addState} onChange={() => setAddState(!addState)} disabled={readOnly} />} label="Add New State" />
          {addState
            ? <TextField label="New State" value={newState} onChange={e => setNewState(e.target.value)} fullWidth disabled={readOnly} />
            : <TextField select label="State" name="stateId" value={form.stateId} onChange={handleChange} fullWidth disabled={readOnly}>
                {states.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
              </TextField>
          }

          <FormControlLabel control={<Switch checked={addCity} onChange={() => setAddCity(!addCity)} disabled={readOnly || (!addState && !form.stateId)} />} label="Add New City" />
          {addCity
            ? <TextField label="New City" value={newCity} onChange={e => setNewCity(e.target.value)} fullWidth disabled={readOnly} />
            : <TextField select label="City" name="cityId" value={form.cityId} onChange={handleChange} fullWidth disabled={readOnly || !form.stateId}>
                {cities.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </TextField>
          }

          <TextField type="date" label="Start Date" name="startDate" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} disabled={readOnly} />
          <TextField type="date" label="End Date" name="endDate" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} disabled={readOnly} />
          <TextField label="Days" value={form.days} InputProps={{ readOnly: true }} />
          <TextField label="Nights" value={form.nights} InputProps={{ readOnly: true }} />
          <TextField label="Package Cost" name="packageCost" type="number" value={form.packageCost} onChange={handleChange} disabled={readOnly} />
          <TextField select label="Currency" name="currency" value={form.currency} onChange={handleChange} disabled={readOnly}>
            <MenuItem value="INR">₹ INR</MenuItem>
            <MenuItem value="USD">$ USD</MenuItem>
            <MenuItem value="EUR">€ EUR</MenuItem>
          </TextField>
          <TextField select label="Tour Type" name="tourType" value={form.tourType} onChange={handleChange} disabled={readOnly}>
            <MenuItem value="Domestic">Domestic</MenuItem>
            <MenuItem value="International">International</MenuItem>
          </TextField>
          <TextField label="Max Tourist" name="maxTourist" type="number" value={form.maxTourist} onChange={handleChange} disabled={readOnly} />
          <TextField
              label="Seats Left"
              name="seatsLeft"
              type="number"
              value={form.seatsLeft}
              InputProps={{ readOnly: true }}
            /> 
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>{isViewMode ? "Close" : "Cancel"}</Button>
        {!isViewMode && (
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : isEditMode ? "Update" : "Create"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
