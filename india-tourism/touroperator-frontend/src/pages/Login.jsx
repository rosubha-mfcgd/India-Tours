import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ForgotAuthModal from "../components/ForgotAuthModal";

// Carousel images
const carouselImages = [
  "/images/tour1.jpg",
  "/images/tour2.jpg",
  "/images/tour3.jpg",
];

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("username");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(form); // login via AuthContext (cookies used automatically)
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Carousel Background */}
      <Slider {...settings}>
        {carouselImages.map((img, idx) => (
          <Box
            key={idx}
            sx={{
              height: "100vh",
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </Slider>

      {/* Overlay Login Form */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          p: 2,
          zIndex: 10,
        }}
      >
        <Paper sx={{ p: 4, maxWidth: 420, width: "100%" }} elevation={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Yatri Saathi - Tour Operator CRM
          </Typography>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>

            {/* Forgot Links */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                mt: 2,
                "& button": {
                  fontSize: "0.85rem",
                  textTransform: "none",
                },
              }}
            >
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setModalType("username");
                  setOpenModal(true);
                }}
              >
                Forgot Username?
              </Button>

              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setModalType("password");
                  setOpenModal(true);
                }}
              >
                Forgot Password?
              </Button>
            </Stack>

            {error && <Typography color="error">{error}</Typography>}
          </form>
        </Paper>
      </Box>

      {/* Forgot Username / Password Modal */}
      <ForgotAuthModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        type={modalType}
      />
    </Box>
  );
}
