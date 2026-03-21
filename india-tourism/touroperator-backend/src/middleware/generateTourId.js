const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  req.tourId = new mongoose.Types.ObjectId();
  next();
};