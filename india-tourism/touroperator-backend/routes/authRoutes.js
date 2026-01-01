const express = require("express");
const router = express.Router();
const { getUserDetails , register, login , forgotUsername , forgotPassword, resetPassword, createSuperAdmin } = require("../controllers/authController");

const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

// existing routes...
router.get("/getUser", authenticate, getUserDetails);
// Existing routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-username", forgotUsername);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Super admin route (no auth required)
router.post("/create-superadmin", createSuperAdmin);

module.exports = router;
