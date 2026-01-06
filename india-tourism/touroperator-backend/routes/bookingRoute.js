const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

// ================= READ =================
router.get(
  "/",
  authenticate,
  authorizeRole(1, 2, 3),
  bookingController.getBookings
);

router.get(
  "/:tourId",
  authenticate,
  authorizeRole(1, 2, 3),
  bookingController.getBookingByTourId
)

module.exports = router;
