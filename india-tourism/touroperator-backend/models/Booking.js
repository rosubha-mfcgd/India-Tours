const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    // ---------------- Numeric booking ID
    _id: { type: Number, unique: true, index: true },

    tourId: {
      type: Number,
      ref: "Tour",
      required: true,
    },

    persons: {
      type: Number,
      required: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    payment: {
      paymentId: String,
      status: String,
      cardLast4: String,
      method: {
        type: String,
        default: "card",
      },
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "FAILED"],
      default: "CONFIRMED",
    },
  },
  { timestamps: true }
);