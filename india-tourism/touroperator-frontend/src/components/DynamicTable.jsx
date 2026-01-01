import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axiosClient from "../apiconfig/axiosClient";
import { AuthContext } from "../context/AuthContext";

const EXCLUDED_FIELDS = ["_id", "__v"];

// Add at the top of the file
const API_MAPPING = {
  products: "/admin/products",
  "tour-operators": "/admin/tour-operators",
   tours: "/admin/tours",
  // add more mappings as needed
};

const formatDate = (value) => {
  if (!value) return "";  
  const date = new Date(value);
  return isNaN(date) ? value : date.toISOString().split("T")[0];
};

const renderCellValue = (key, value) => {
  if (!value) return "";

  // Render PNG/Base64 image
  if (key === "image" && typeof value === "string") {
    return (
      <img
        src={value}
        alt="product"
        style={{
          width: 70,
          height: 70,
          objectFit: "cover",
          borderRadius: 6,
          border: "1px solid #ddd",
        }}
      />
    );
  }

  // Render formatted dates
  if (key === "createdAt" || key === "updatedAt") {
    return formatDate(value);
  }

  return value;
};

export default function DynamicTable({ resource }) {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("error");

  const showSnack = (message, severity = "error") => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const fetchData = async () => {
  setLoading(true);
  try {
    const endpoint = API_MAPPING[resource] || `/${resource}`;
    const res = await axiosClient.get(endpoint);
    setData(res.data);
  } catch (err) {
    showSnack(
      err.response?.data?.message ||
        err.response?.statusText ||
        "Failed to load data"
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, [resource]);

  const handleEditClick = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleEditSave = async () => {
  try {
    const endpoint = API_MAPPING[resource] || `/${resource}`;
    await axiosClient.put(`${endpoint}/${editRow._id}`, editRow);
    showSnack("Updated successfully", "success");
    setEditOpen(false);
    fetchData();
  } catch (err) {
    showSnack(
      err.response?.data?.message ||
        err.response?.statusText ||
        "Update failed"
    );
  }
};

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;

  try {
    const endpoint = API_MAPPING[resource] || `/${resource}`;
    await axiosClient.delete(`${endpoint}/${id}`);
    showSnack("Deleted successfully", "success");
    fetchData();
  } catch (err) {
    showSnack(
      err.response?.data?.message ||
        err.response?.statusText ||
        "Delete failed"
    );
  }
};

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <CircularProgress />
      </div>
    );
  }

  if (!data.length) {
    return <Typography>No {resource} found.</Typography>;
  }

  const visibleColumns = Object.keys(data[0]).filter(
    (key) => !EXCLUDED_FIELDS.includes(key)
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              {user?.roleID === 1 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                {visibleColumns.map((key) => (
                  <TableCell key={key}>
                    {renderCellValue(key, row[key])}
                  </TableCell>
                ))}

                {user?.roleID === 1 && (
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>Edit {resource.slice(0, -1)}</DialogTitle>
        <DialogContent>
          {editRow &&
            Object.keys(editRow).map(
              (key) =>
                !EXCLUDED_FIELDS.includes(key) &&
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "image" && (
                  <TextField
                    key={key}
                    label={key}
                    value={editRow[key]}
                    onChange={(e) =>
                      setEditRow({ ...editRow, [key]: e.target.value })
                    }
                    fullWidth
                    margin="dense"
                  />
                )
            )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
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
    </>
  );
}
