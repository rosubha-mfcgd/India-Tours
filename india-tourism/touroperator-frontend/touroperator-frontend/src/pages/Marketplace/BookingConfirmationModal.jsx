import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
} from "@mui/material";

export default function BookingConfirmationModal({ open, onClose, booking }) {
  if (!booking) return null;

  // Format ISO dates to readable string
  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-IN");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>🎉 Booking Confirmed</DialogTitle>

      <DialogContent>
        <Typography fontWeight={600} gutterBottom>
          Your tour has been booked successfully!
        </Typography>

        <Box mt={2}>
          <Typography variant="body2">
            <strong>Booking Status:</strong> {booking.status}
          </Typography>

          <Typography variant="body2">
            <strong>Booking for:</strong> {booking.persons} person(s)
          </Typography>

          <Typography variant="body2">
            <strong>Amount Paid:</strong>{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: booking.currency,
            }).format(booking.amountPaid)}
          </Typography>

          <Typography variant="body2">
            <strong>Method of Payment:</strong> {booking.payment.method.toUpperCase()} (Card ending {booking.payment.cardLast4})
          </Typography>

          <Typography variant="body2">
            <strong>Tour Dates:</strong> {formatDate(booking.fromDate)} → {formatDate(booking.toDate)}
          </Typography>

          <Typography variant="body2">
            <strong>Days / Nights:</strong> {booking.days} day(s) / {booking.nights} night(s)
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
