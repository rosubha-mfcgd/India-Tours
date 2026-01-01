const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const { authenticate } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const generateTourId = require("../middleware/generateTourId");
const { uploadImage, deleteOldTourImage } = require("../middleware/upload");




// ================= CREATE TOUR (with image) =================
router.post(
  "/",
  authenticate,
  allowRoles([1, 2]),
  generateTourId,              
  uploadImage("tourImages"),   
  tourController.addTourWithImage
);

// ================= UPDATE TOUR (with or without image) =================
router.put(
  "/:id",
  authenticate,
  allowRoles([1, 2]),
  uploadImage("tourImages"),
  tourController.updateTour
);

// ================= DELETE TOUR =================
router.delete(
  "/:id",
  authenticate,
  allowRoles([1, 2]),
  tourController.deleteTour
);

// ================= READ =================
router.get(
  "/",
  authenticate,
  allowRoles([1, 2, 3]),
  tourController.getAllTours
);

router.get(
  "/:id",
  authenticate,
  allowRoles([1, 2, 3]),
  tourController.getTourById
);

router.post(
  "/book/:id", 
  authenticate,
  allowRoles([1, 2, 3]),
  tourController.bookTour);


module.exports = router;
