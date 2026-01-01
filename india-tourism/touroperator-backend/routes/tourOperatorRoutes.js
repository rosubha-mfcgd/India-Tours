const express = require("express");
const router = express.Router();
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const { createTourOperator, getAllTourOperators, updateTourOperator,deleteTourOperator } = require("../controllers/tourOperatorController");

// Admin only → create Tour Operator
router.post(
  "/",
  authenticate,
  authorizeRole(1), // ONLY ADMIN
  createTourOperator
);
// Get all tour operators
router.get(
  "/",
  authenticate,
  authorizeRole(1), // ADMIN
  getAllTourOperators
);
// Get all tour operators by id
router.get(
  "/:id",
  authenticate,
  authorizeRole(1), // ADMIN
  getAllTourOperators
);

// Update tour operator email/password
router.put(
  "/:id",
  authenticate,
  authorizeRole(1), // ADMIN
  updateTourOperator
);



// Update tour operator email/password
router.delete(
  "/:id",
  authenticate,
  authorizeRole(1), // ADMIN
  deleteTourOperator
);

module.exports = router;
