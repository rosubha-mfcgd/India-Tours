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
} from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { createTour, updateTour } from "../../apiconfig/tourApi";
import { getStates, createState } from "../../apiconfig/stateApi";
import { getCities, createCity } from "../../apiconfig/cityApi";
import { getImage } from "../../apiconfig/imageDetailsApi";

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

export default function TourModal({ open, onClose, onSuccess, editingTour = null }) {
  const { user } = useContext(AuthContext);
  const isEditMode = Boolean(editingTour);

  const [form, setForm] = useState(initialForm);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addState, setAddState] = useState(false);
  const [addCity, setAddCity] = useState(false);
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // ---------------- Fetch image blob if editing
  const fetchImageBlob = async (tour) => {
    if (!tour.image?.fileId) return;
    try {
      const res = await getImage(tour.image.fileId);
      const blob = res.data;
      const objectUrl = URL.createObjectURL(blob);
      setPreviewImage(objectUrl);
    } catch (err) {
      console.error("Image fetch failed", err);
    }
  };

  // ---------------- Load States
  useEffect(() => {
    if (open) getStates().then((res) => setStates(res.data));
  }, [open]);

  // ---------------- Prefill edit or reset form
  useEffect(() => {
    if (editingTour && open) {
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
      fetchImageBlob(editingTour);
    } else if (open) {
      setForm(initialForm);
      setCities([]);
      setNewState("");
      setNewCity("");
      setAddState(false);
      setAddCity(false);
      setImageFile(null);
      setPreviewImage("");
    }
  }, [editingTour, open]);

  // ---------------- Load Cities when state changes
  useEffect(() => {
    if (form.stateId) getCities(form.stateId).then((res) => setCities(res.data));
    else setCities([]);
  }, [form.stateId]);

  // ---------------- Auto-calc Days & Nights
  useEffect(() => {
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      const diffDays = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 0);
      setForm((f) => ({
        ...f,
        days: diffDays + 1,
        nights: diffDays,
      }));
    }
  }, [form.startDate, form.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["seatsLeft", "maxTourist", "nights", "days", "packageCost"].includes(name)
        ? value === "" ? "" : Number(value)
        : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ---------------- Submit form
  const handleSubmit = async () => {
    try {
      let stateId = form.stateId;
      let cityId = form.cityId;

      if (addState && newState) {
        const stateRes = await createState({ name: newState });
        stateId = stateRes.data._id;
      }

      if (addCity && newCity && stateId) {
        const cityRes = await createCity({ name: newCity, stateId });
        cityId = cityRes.data._id;
      }

      const tripLength = Math.max(form.days, form.nights);

      // If edit mode, send only updated fields
      if (isEditMode) {
        const updates = {};

        for (const key in form) {
          if (form[key] !== editingTour[key] && form[key] !== undefined) {
            updates[key] = form[key];
          }
        }

        // Include state and city if changed
        if (stateId !== editingTour.stateId?._id) updates.stateId = stateId;
        if (cityId !== editingTour.cityId?._id) updates.cityId = cityId;

        updates.tripLength = tripLength;

        // Include image file if new one uploaded
        const formData = new FormData();
        for (const key in updates) {
          formData.append(key, updates[key]);
        }

        if (imageFile) {
          formData.append("image", imageFile);
        } else if (editingTour.image?.fileId) {
          // Send existing image id so backend keeps it
          formData.append("image[fileId]", editingTour.image.fileId);
        }

        await updateTour(editingTour._id, formData);
      } else {
        // New tour creation
        const formData = new FormData();
        Object.entries({
          ...form,
          stateId,
          cityId,
          tripLength,
          ticketCost: 0,
          tourOperatorId: user.id,
        }).forEach(([key, value]) => {
          formData.append(key, value);
        });
        if (imageFile) formData.append("image", imageFile);
        await createTour(formData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Tour" : "Create Tour"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />

          <FormControlLabel control={<Switch checked={addState} onChange={() => setAddState(!addState)} />} label="Add New State" />

          {addState ? (
            <TextField label="New State" value={newState} onChange={(e) => setNewState(e.target.value)} fullWidth />
          ) : (
            <TextField select label="State" name="stateId" value={form.stateId} onChange={handleChange} fullWidth>
              {states.map((s) => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
            </TextField>
          )}

          <FormControlLabel control={<Switch checked={addCity} onChange={() => setAddCity(!addCity)} disabled={!addState && !form.stateId} />} label="Add New City" />

          {addCity ? (
            <TextField label="New City" value={newCity} onChange={(e) => setNewCity(e.target.value)} fullWidth />
          ) : (
            <TextField select label="City" name="cityId" value={form.cityId} onChange={handleChange} fullWidth disabled={!form.stateId}>
              {cities.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
            </TextField>
          )}

          <TextField type="date" label="Start Date" name="startDate" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField type="date" label="End Date" name="endDate" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />

          <TextField label="Days" value={form.days} InputProps={{ readOnly: true }} />
          <TextField label="Nights" value={form.nights} InputProps={{ readOnly: true }} />

          <TextField label="Package Cost" name="packageCost" type="number" value={form.packageCost} onChange={handleChange} />
          <TextField select label="Currency" name="currency" value={form.currency} onChange={handleChange}>
            <MenuItem value="INR">₹ INR</MenuItem>
            <MenuItem value="USD">$ USD</MenuItem>
            <MenuItem value="EUR">€ EUR</MenuItem>
          </TextField>
          <TextField select label="Tour Type" name="tourType" value={form.tourType} onChange={handleChange}>
            <MenuItem value="Domestic">Domestic</MenuItem>
            <MenuItem value="International">International</MenuItem>
          </TextField>
          <TextField label="Max Tourist" name="maxTourist" type="number" value={form.maxTourist} onChange={handleChange} />
          <TextField label="Seats Left" name="seatsLeft" type="number" value={form.seatsLeft} onChange={handleChange} />

          <Button variant="outlined" component="label">
            {imageFile || previewImage ? "Change Image" : "Upload Image"}
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>

          {previewImage && <img src={previewImage} alt="Tour" style={{ width: "100%", marginTop: 8, borderRadius: 4 }} />}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEditMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
