import React, { useState } from "react";
import DynamicTable from "../../components/DynamicTable";
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axiosClient from "../../apiconfig/axiosClient";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    productDesc: "",
    image: "",
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("error");

  const showSnack = (message, severity = "error") => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Use mapped API endpoint
      await axiosClient.post("/api/admin/products", form);

      showSnack("Product created successfully", "success");
      setForm({ productName: "", productDesc: "", image: "" });
      setOpen(false);
      setRefreshTrigger((prev) => prev + 1); // trigger table refresh
    } catch (err) {
      showSnack(
        err.response?.data?.message ||
          err.response?.statusText ||
          "Failed to create product"
      );
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Add Product
        </Button>
      </Box>

      {/* DynamicTable with refresh trigger */}
      <DynamicTable key={refreshTrigger} resource="products" />

      {/* Add Product Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Product Name"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Product Description"
            name="productDesc"
            value={form.productDesc}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
