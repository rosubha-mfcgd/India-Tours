import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";

const ForgotAuthModal = ({ open, onClose, type }) => {
  /**
   * type = "username" | "password"
   */

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    try {
      // const url =
      //   type === "username"
      //     ? "http://localhost:5000/api/auth/forgot-username"
      //     : "http://localhost:5000/api/auth/forgot-password";
      const url =
        type === "username"
          ? "http://api.mitramtouroperator.com/api/auth/forgot-username"
          : "http://api.mitramtouroperator.com/api/auth/forgot-password";

      const payload =
        type === "username"
          ? { email: value }
          : { username: value };

      const res = await axios.post(url, payload);

      setMessage(res.data.message || "Request successful");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {type === "username" ? "Forgot Username" : "Forgot Password"}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" mb={2}>
          {type === "username"
            ? "Enter your registered email to retrieve your username."
            : "Enter your username to reset your password."}
        </Typography>

        <TextField
          fullWidth
          label={type === "username" ? "Email Address" : "Username"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {message && (
          <Typography color="success.main" mt={2}>
            {message}
          </Typography>
        )}

        {error && (
          <Typography color="error.main" mt={2}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotAuthModal;
