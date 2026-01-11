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
import { getCategories } from "../../apiconfig/categoryApi";
import { getImage } from "../../apiconfig/imageDetailsApi";

const initialForm = {
  description: "",
  category: "",
  state: "",
  city: "",
  packageCost: 0,
  currency: "INR",
  tourType: "Domestic",
  startDate: "",
  endDate: "",
  nights: 0,
  days: 0,
  maxTourist: 0,
};

export default function TourModal({ open, onClose, onSuccess, editingTour = null, readOnly = false }) {
  const { user } = useContext(AuthContext);
  const isEditMode = Boolean(editingTour);
  const isViewMode = Boolean(readOnly);

  const [form, setForm] = useState(initialForm);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addState, setAddState] = useState(false);
  const [addCity, setAddCity] = useState(false);
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // ---------------- Fetch tour image for edit mode
  const fetchImageBlob = async (tour) => {
    if (!tour.image?.fileId) return;
    try {
      const res = await getImage(tour.image.fileId);
      const blob = res.data;
      setPreviewImage(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Image fetch failed", err);
    }
  };

  // ---------------- Load States & Categories
  useEffect(() => {
    if (!open) return;

    getStates().then(res => setStates(res.data)).catch(err => console.error(err));
    getCategories().then(res => {
      let cats = res.data || [];
      if (editingTour?.category?._id && !cats.find(c => c._id === editingTour.category._id)) {
        cats.push({ _id: editingTour.category._id, name: editingTour.category.name });
      }
      setCategories(cats);
    }).catch(err => console.error(err));
  }, [open, editingTour]);

  // ---------------- Prefill form for edit mode
  useEffect(() => {
    if (!open) return;

    if (editingTour) {
      setForm({
        description: editingTour.description || "",
        category: editingTour.category?._id || "",
        state: editingTour.state?._id || "",
        city: editingTour.city?._id || "",
        packageCost: editingTour.packageCost || 0,
        currency: editingTour.currency || "INR",
        tourType: editingTour.tourType || "Domestic",
        startDate: editingTour.startDate?.slice(0, 10) || "",
        endDate: editingTour.endDate?.slice(0, 10) || "",
        nights: editingTour.nights || 0,
        days: editingTour.days || 0,
        maxTourist: editingTour.maxTourist || 0,
      });
      fetchImageBlob(editingTour);
      setAddState(false);
      setAddCity(false);
      setNewState("");
      setNewCity("");

      if (editingTour.state?._id) {
        getCities(editingTour.state._id).then(res => {
          setCities(res.data);
          if (!res.data.find(c => c._id === editingTour.city?._id)) {
            setForm(prev => ({ ...prev, city: "" }));
          }
        }).catch(err => console.error(err));
      }
    } else {
      setForm(initialForm);
      setCities([]);
      setAddState(false);
      setAddCity(false);
      setNewState("");
      setNewCity("");
      setImageFile(null);
      setPreviewImage("");
    }
  }, [editingTour, open]);

  // ---------------- Load Cities when state changes
  useEffect(() => {
    if (form.state) {
      getCities(form.state).then(res => {
        setCities(res.data);
        if (!res.data.find(c => c._id === form.city)) setForm(prev => ({ ...prev, city: "" }));
      }).catch(err => console.error(err));
    } else {
      setCities([]);
      setForm(prev => ({ ...prev, city: "" }));
    }
  }, [form.state]);

  // ---------------- Reset city when addCity toggled
  useEffect(() => {
    if (addCity) setForm(prev => ({ ...prev, city: "" }));
  }, [addCity]);

  // ---------------- Auto-calc Days & Nights
  useEffect(() => {
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      const diffDays = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 0);
      setForm(prev => ({ ...prev, days: diffDays + 1, nights: diffDays }));
    }
  }, [form.startDate, form.endDate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ["maxTourist", "nights", "days", "packageCost"].includes(name) ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ---------------- Submit form
  const handleSubmit = async () => {
  try {
    let stateId = form.state;
    let cityId = form.city;
    const categoryId = form.category;

    // 1️⃣ Create new state (if toggled)
    if (addState && newState.trim()) {
      const stateRes = await createState({ name: newState.trim() });
      stateId = stateRes.data._id;
    }

    // 2️⃣ Create new city using FINAL stateId
    if (addCity && newCity.trim() && stateId) {
      const cityRes = await createCity({
        name: newCity.trim(),
        state: stateId,
      });
      cityId = cityRes.data._id;
    }

    // 3️⃣ Calculate derived fields
    const tripLength = Math.max(form.days, form.nights);

    // 4️⃣ Build payload USING LOCAL IDS (NOT form state)
    const payload = {
      ...form,
      state: stateId,
      city: cityId,
      category: categoryId,
      tripLength,
      ticketCost: 0,
      tourOperator: user.id,
    };

    const formData = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        formData.append(k, v.toString());
      }
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // 5️⃣ Save
    if (isEditMode) {
      await updateTour(editingTour._id, formData);
    } else {
      await createTour(formData);
    }

    onSuccess();
    onClose();
  } catch (err) {
    console.log(err.stack)
    console.error("Tour save failed:", err);
  }
};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Tour" : "Create Tour"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth disabled={isViewMode} />

          {/* State */}
          <FormControlLabel control={<Switch checked={addState} onChange={() => setAddState(!addState)} disabled={isViewMode} />} label="Add New State" />
          {addState ? <TextField label="New State" value={newState} onChange={e => setNewState(e.target.value)} fullWidth disabled={isViewMode} />
            : <TextField select label="State" name="state" value={form.state} onChange={handleChange} fullWidth disabled={isViewMode}>{states.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}</TextField>}

          {/* City */}
          <FormControlLabel control={<Switch checked={addCity} onChange={() => setAddCity(!addCity)} disabled={!addState && !form.state || isViewMode} />} label="Add New City" />
          {addCity ? <TextField label="New City" value={newCity} onChange={e => setNewCity(e.target.value)} fullWidth disabled={isViewMode} />
            : <TextField select label="City" name="city" value={form.city} onChange={handleChange} fullWidth disabled={!form.state || isViewMode}>{cities.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}</TextField>}

          {/* Category */}
          <TextField select label="Category" name="category" value={form.category || ""} onChange={handleChange} fullWidth disabled={isViewMode}>
            {categories.length === 0 ? <MenuItem value="">No categories available</MenuItem> : categories.map(cat => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)}
          </TextField>

          {/* Dates */}
          <TextField type="date" label="Start Date" name="startDate" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} disabled={isViewMode} />
          <TextField type="date" label="End Date" name="endDate" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} disabled={isViewMode} />

          {/* Days & Nights */}
          <TextField label="Days" value={form.days} InputProps={{ readOnly: true }} disabled={isViewMode} />
          <TextField label="Nights" value={form.nights} InputProps={{ readOnly: true }} disabled={isViewMode} />

          {/* Package & Type */}
          <TextField label="Package Cost" name="packageCost" type="number" value={form.packageCost} onChange={handleChange} disabled={isViewMode} />
          <TextField select label="Currency" name="currency" value={form.currency} onChange={handleChange} disabled={isViewMode}>
            <MenuItem value="INR">₹ INR</MenuItem>
            <MenuItem value="USD">$ USD</MenuItem>
            <MenuItem value="EUR">€ EUR</MenuItem>
          </TextField>
          <TextField select label="Tour Type" name="tourType" value={form.tourType} onChange={handleChange} disabled={isViewMode}>
            <MenuItem value="Domestic">Domestic</MenuItem>
            <MenuItem value="International">International</MenuItem>
          </TextField>

          {/* Max Tourist */}
          <TextField label="Max Tourist" name="maxTourist" type="number" value={form.maxTourist} onChange={handleChange} disabled={isViewMode} />

          {/* Image */}
          {!isViewMode && <Button variant="outlined" component="label">{imageFile || previewImage ? "Change Image" : "Upload Image"}<input type="file" hidden accept="image/*" onChange={handleImageChange} /></Button>}
          {previewImage && <img src={previewImage} alt="Tour" style={{ width: "100%", marginTop: 8, borderRadius: 4 }} />}
        </Stack>
      </DialogContent>

      {!isViewMode && <DialogActions><Button onClick={onClose}>Cancel</Button><Button variant="contained" onClick={handleSubmit}>{isEditMode ? "Update" : "Create"}</Button></DialogActions>}
    </Dialog>
  );
}
