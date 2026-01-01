import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function DeleteConfirmationModal({
  open,
  onClose,
  tourDescription,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CheckCircleOutlineIcon color="success" />
        Tour Deleted
      </DialogTitle>

      <DialogContent>
        <Typography>
          The tour <strong>"{tourDescription}"</strong> has been deleted
          successfully.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
