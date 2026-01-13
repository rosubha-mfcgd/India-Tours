const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema(
  {
    _id: {
      type: Number, // numeric phone ID
      required: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["mobile", "home", "work", "office", "other"],
      default: "mobile",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false, // prevents Mongo from auto-creating ObjectId
    timestamps: false,
  }
);

module.exports = phoneSchema;
