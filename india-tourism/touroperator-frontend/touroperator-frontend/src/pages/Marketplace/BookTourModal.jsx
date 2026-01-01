import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function BookTourModal({ open, onClose, tour, onConfirm }) {
  // ---------------- Booking state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalPersons, setTotalPersons] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // ---------------- Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const pricePerPerson = tour?.packageCost || 0;
  const currency = tour?.currency || "INR";

  // ---------------- Calculate totals
  useEffect(() => {
    const persons = adults + children;
    setTotalPersons(persons);
    setTotalPrice(persons * pricePerPerson);
  }, [adults, children, pricePerPerson]);

  const Counter = ({ label, value, onAdd, onRemove }) => (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
      <Typography>{label}</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={onRemove} disabled={value === 0}>
          <Remove />
        </IconButton>
        <Typography>{value}</Typography>
        <IconButton onClick={onAdd}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );

  const handleConfirm = () => {
    if (
      !fromDate ||
      !toDate ||
      !cardNumber ||
      !cardName ||
      !expiry ||
      !cvv
    ) {
      alert("Please fill all booking and payment details");
      return;
    }

    onConfirm({
      persons: totalPersons,
      fromDate,
      toDate,
      payment: {
        method: "card",
        cardNumber,
        cardName,
        expiry,
        cvv,
        amount: totalPrice,
        currency,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book Tour</DialogTitle>

      <DialogContent>
        {/* TOUR INFO */}
        <Typography fontWeight={600}>{tour?.description}</Typography>
        <Typography variant="body2" color="text.secondary">
          {tour?.cityId?.name}, {tour?.stateId?.name}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* PERSON COUNTERS */}
        <Counter
          label="Adults"
          value={adults}
          onAdd={() => setAdults(adults + 1)}
          onRemove={() => setAdults(Math.max(1, adults - 1))}
        />

        <Counter
          label="Children"
          value={children}
          onAdd={() => setChildren(children + 1)}
          onRemove={() => setChildren(Math.max(0, children - 1))}
        />

        <TextField
          label="Number of Persons"
          fullWidth
          margin="normal"
          value={totalPersons}
          InputProps={{ readOnly: true }}
        />

        {/* DATE SELECTION */}
        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="From Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <TextField
            label="To Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Box>

        {/* TOTAL PRICE */}
        <Box mt={3}>
          <Typography fontWeight={600}>
            Total Price:{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency,
            }).format(totalPrice)}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* PAYMENT SECTION */}
        <Typography variant="subtitle1" fontWeight={600}>
          Payment Details
        </Typography>

        <TextField
          label="Cardholder Name"
          fullWidth
          margin="normal"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />

        <TextField
          label="Card Number"
          fullWidth
          margin="normal"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          inputProps={{ maxLength: 16 }}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Expiry (MM/YY)"
              fullWidth
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVV"
              fullWidth
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              inputProps={{ maxLength: 4 }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Pay & Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}
