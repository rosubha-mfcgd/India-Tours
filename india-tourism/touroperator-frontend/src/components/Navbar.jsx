import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Hide navbar completely if user is not authenticated
  if (!user) return null;

  return (
    <AppBar position="static" color="default" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Yatri Saathi
        </Typography>

        {/* Center/Right side: Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button component={RouterLink} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button component={RouterLink} to="/market-place" color="inherit">
            Marketplace
          </Button>
          <Button component={RouterLink} to="/tours" color="inherit">
            Tours
          </Button>
          {user.roleID === 1 && (
            <>
              <Button component={RouterLink} to="/tour-operators" color="inherit">
                Tour Operators
              </Button>
              <Button component={RouterLink} to="/categories" color="inherit">
                Categories
              </Button>
            </>
          )}

          {/* User icon + logout */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
