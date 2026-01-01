// models/Tour.js
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    tourOperatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    tripLength: {
      type: Number,
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    packageCost: {
      type: Number,
      required: true
    },

    nights: Number,
    days: Number,

    maxTourist: {
      type: Number,
      required: true
    },

    seatsLeft: {
      type: Number,
      required: true
    },

    tourType: {
      type: String,
      enum: ["Domestic", "International"],
      required: true
    },

    ticketCost: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true
    },

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true
    },

    description: {
      type: String,
      required: true
    },

   image: {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tourImages.files",
      required: true
    },
    filename: {
      type: String,
      required: true
      }
   },

    itinerary: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
