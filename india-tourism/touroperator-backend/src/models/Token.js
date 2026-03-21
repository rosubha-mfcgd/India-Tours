const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      unique: true,
      index: true,
    },

    userId: {
      type: Number,        // numeric User._id
      ref: "User",
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
      index: true,
    },

    startTime: {
      type: Date,
      required: true,
      default: Date.now,
    },

    expiresIn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Optional: prevent duplicate active tokens per user
// tokenSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("Token", tokenSchema);
