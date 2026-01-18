// tourController.js
const Booking = require("../models/Booking"); // make sure path is correct
const Tour = require("../models/Tour");

// ---------------- Get all bookings
exports.getBookings = async (req, res) => {
  try {
    // Optionally filter by tourId
    const { tourId } = req.query;

    let filter = {};
    if (tourId) filter.tourId = tourId;
    // derive tourOperatorId from logged-in user
    const userId = req.user._id;
    console.log('userId...',userId);
    if(userId) filter.tourOperatorId = userId;
    console.log('filter...',filter);
    const bookings = await Booking.find(filter)
      .populate("tourId", "description") // populate tour info if needed
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * Get number of bookings for a specific tour
 * Route: GET /api/bookings/tour/:tourId
 * Access: Authenticated users (or optionally restrict by role)
 */
exports.getBookingByTourId = async (req, res) => {
  const { tourId } = req.params;

  try {
    // Fetch the tour
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Count bookings for this tour
    const bookingsCount = await Booking.countDocuments({ tourId });

    res.json({
      tourId: tour._id,
      description: tour.description,
      packageCost: tour.packageCost,
      currency: tour.currency || "INR",
      bookingsCount,
    });
  } catch (err) {
    console.error("Error fetching bookings for tour:", err);
    res.status(500).json({ message: "Server error" });
  }
};