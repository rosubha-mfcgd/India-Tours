import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import TourModal from "./TourModal";
import { getTours , deleteTour } from "../../apiconfig/tourApi";
import { getImage } from "../../apiconfig/imageDetailsApi";
import { AuthContext } from "../../context/AuthContext";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const API_BASE = process.env.REACT_APP_API_URL;

export default function TourDashboard({ filters }) {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [imageMap, setImageMap] = useState({}); // tourId -> objectURL
  const [openModal, setOpenModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletedTourDesc, setDeletedTourDesc] = useState("");

  // ------------------------
  // Fetch tours
  // ------------------------
  const fetchTours = async (appliedFilters = {}) => {
    try {
      const res = await getTours(appliedFilters);
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteTour = async () => {
  if (!tourToDelete) return;

  try {
    await deleteTour(tourToDelete._id);

    setDeletedTourDesc(tourToDelete.description);
    setDeleteModalOpen(true);

    setConfirmDeleteOpen(false);
    setTourToDelete(null);

    // Refresh list
    setReloadKey((k) => k + 1);
  } catch (error) {
    console.error("Delete failed", error);
  }
};

  // ------------------------
  // Fetch image blob
  // ------------------------
  const fetchImageBlob = async (tour) => {
  if (!tour.image?.fileId) return;

  try {
    const res = await getImage(tour.image.fileId); // call API helper
    const blob = res.data; // axios returns blob in data
    const objectUrl = URL.createObjectURL(blob);

    setImageMap((prev) => ({
      ...prev,
      [tour._id]: objectUrl,
    }));
  } catch (err) {
    console.error("Image fetch failed", err);
  }
};

  // ------------------------
  // Effects
  // ------------------------
  useEffect(() => {
    fetchTours(filters);
  }, [filters, reloadKey]);

  useEffect(() => {
    tours.forEach(fetchImageBlob);

    // cleanup object URLs
    return () => {
      Object.values(imageMap).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [tours]);

  // ------------------------
  // Handlers
  // ------------------------
  const handleSuccess = () => {
    setReloadKey((k) => k + 1);
    setEditingTour(null);
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setOpenModal(true);
  };

  const handleDelete = (tour) => {
    setTourToDelete(tour);
    setConfirmDeleteOpen(true);
  };

  // ------------------------
  // Render
  // ------------------------
  return (
    <>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Tours Dashboard</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditingTour(null);
            setOpenModal(true);
          }}
        >
          Create Tour
        </Button>
      </Stack>

      {/* TOUR LIST */}
      <Stack spacing={2}>
        {tours.map((tour) => (
          <Card key={tour._id} sx={{ display: "flex", flexDirection: "row" }}>
            <CardContent sx={{ flex: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{tour.description}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={() => handleEdit(tour)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(tour)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Operator: {tour.tourOperatorName || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                City: {tour.cityId?.name || "-"} | State: {tour.stateId?.name || "-"}
              </Typography>
              <Typography variant="body2">
                Trip Length: {tour.tripLength} | Nights: {tour.nights} | Days: {tour.days}
              </Typography>
              <Typography variant="body2">
                Package Cost:{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: tour.currency || "INR",
                }).format(tour.packageCost)}
                {" | "}
                Ticket Cost:{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: tour.currency || "INR",
                }).format(tour.ticketCost)}
              </Typography>
              <Typography variant="body2">
                Max Tourist: {tour.maxTourist} | Seats Left: {tour.seatsLeft}
              </Typography>
              <Typography variant="body2">Tour Type: {tour.tourType}</Typography>
              <Typography variant="body2">
                Dates:{" "}
                {new Date(tour.startDate).toLocaleDateString()} -{" "}
                {new Date(tour.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>

            {imageMap[tour._id] && (
              <CardMedia
                component="img"
                sx={{
                  width: 160,           // fixed width or percentage
                  height: "100%",       // fill the card row height
                  objectFit: "cover",   // crop but maintain aspect ratio
                  borderRadius: 1       // optional: rounded corners
                }}
                image={imageMap[tour._id]}
                alt={tour.description}
              />
            )}
          </Card>
        ))}
      </Stack>

      {/* MODAL */}
      {openModal && (
        <TourModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={handleSuccess}
          tourOperatorId={user?._id}
          editingTour={editingTour}
        />
      )}
     {/* DELETE CONFIRM MODAL */}
      <DeleteConfirmModal
        open={confirmDeleteOpen}
        tourDescription={tourToDelete?.description || ""}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDeleteTour}
      />

      {/* DELETE SUCCESS MODAL */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        tourDescription={deletedTourDesc}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
