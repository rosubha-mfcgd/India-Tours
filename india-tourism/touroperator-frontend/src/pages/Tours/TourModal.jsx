import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem
} from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { createTour, updateTour } from "../../apiconfig/tourApi";
import { getStates } from "../../apiconfig/stateApi";
import { getCities } from "../../apiconfig/cityApi";
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
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

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

  useEffect(() => {
    if (!open) return;
    
    getStates().then(res => setStates(res.data)).catch(err => console.error(err));
    getCategories().then(res => {
      let cats = res.data || [];
      console.log('categories....',cats)
      if (editingTour?.category?._id && !cats.find(c => c._id === editingTour.category._id)) {
        cats.push({ _id: editingTour.category._id, name: editingTour.category.name });
      }
      setCategories(cats);
    }).catch(err => console.error(err));
  }, [open, editingTour]);

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
      if (editingTour.state?._id) {
        getCities(editingTour.state._id).then(res => setCities(res.data || [])).catch(err => console.error(err));
      }
    } else {
      setForm(initialForm);
      setCities([]);
      setImageFile(null);
      setPreviewImage("");
    }
  }, [editingTour, open]);

  useEffect(() => {
    if (form.state) {
      getCities(form.state).then(res => {
        setCities(res.data || []);
        // Reset city if it doesn't belong to selected state
        if (!res.data.find(c => c._id === form.city)) {
          setForm(prev => ({ ...prev, city: "" }));
        }
      }).catch(err => console.error(err));
    } else {
      setCities([]);
      setForm(prev => ({ ...prev, city: "" }));
    }
  }, [form.state]);

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

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        tripLength: Math.max(form.days, form.nights),
        ticketCost: 0,
        tourOperator: user.id,
      };
      const formData = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") formData.append(k, v.toString());
      });
      if (imageFile) formData.append("image", imageFile);
      if (isEditMode) {
        await updateTour(editingTour._id, formData);
      } else {
        await createTour(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Tour save failed:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Tour" : "Create Tour"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth disabled={isViewMode} />

          <TextField select label="State" name="state" value={form.state} onChange={handleChange} fullWidth disabled={isViewMode}>
            {states.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
          </TextField>

          <TextField select label="City" name="city" value={form.city} onChange={handleChange} fullWidth disabled={!form.state || isViewMode}>
            {cities.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
          </TextField>

          <TextField select label="Category" name="category" value={form.category || ""} onChange={handleChange} fullWidth disabled={isViewMode}>
            {categories.length === 0 ? <MenuItem value="">No categories available</MenuItem> : categories.map(cat => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)}
          </TextField>

          <TextField type="date" label="Start Date" name="startDate" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} disabled={isViewMode} />
          <TextField type="date" label="End Date" name="endDate" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} disabled={isViewMode} />

          <TextField label="Days" value={form.days} InputProps={{ readOnly: true }} disabled={isViewMode} />
          <TextField label="Nights" value={form.nights} InputProps={{ readOnly: true }} disabled={isViewMode} />

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

          <TextField label="Max Tourist" name="maxTourist" type="number" value={form.maxTourist} onChange={handleChange} disabled={isViewMode} />

          {!isViewMode && <Button variant="outlined" component="label">{imageFile || previewImage ? "Change Image" : "Upload Image"}<input type="file" hidden accept="image/*" onChange={handleImageChange} /></Button>}
          {previewImage && <img src={previewImage} alt="Tour" style={{ width: "100%", marginTop: 8, borderRadius: 4 }} />}
        </Stack>
      </DialogContent>

      {!isViewMode && <DialogActions><Button onClick={onClose}>Cancel</Button><Button variant="contained" onClick={handleSubmit}>{isEditMode ? "Update" : "Create"}</Button></DialogActions>}
    </Dialog>
  );
}