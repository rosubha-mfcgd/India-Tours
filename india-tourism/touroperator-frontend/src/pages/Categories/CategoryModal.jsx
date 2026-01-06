import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

import {
  createCategory,
  updateCategory,
} from "../../apiconfig/categoryApi"; // import API functions

export default function CategoryModal({
  open,
  onClose,
  onSuccess,
  category,
}) {
  const [form, setForm] = useState({
    categoryName: "",
    categoryDesc: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (category) {
      setForm({
        categoryName: category.categoryName || "",
        categoryDesc: category.categoryDesc || "",
      });
      setImagePreview(category.imageUrl || null);
    } else {
      resetForm();
    }
  }, [category]);

  const resetForm = () => {
    setForm({ categoryName: "", categoryDesc: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryName", form.categoryName);
      formData.append("categoryDesc", form.categoryDesc);
      if (imageFile) formData.append("image", imageFile);

      if (category?._id) {
        await updateCategory(category._id, formData);
      } else {
        await createCategory(formData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Category save failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {category ? "Edit Category" : "Add Category"}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Category Name"
          name="categoryName"
          value={form.categoryName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Category Description"
          name="categoryDesc"
          value={form.categoryDesc}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />

        <Box mt={2}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Category Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {imagePreview && (
            <Box mt={2} display="flex" justifyContent="center">
              <Box
                component="img"
                src={imagePreview}
                sx={{
                  maxHeight: 200,
                  maxWidth: "100%",
                  borderRadius: 2,
                  border: "1px solid #ddd",
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {category ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
