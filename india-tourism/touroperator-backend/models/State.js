const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    _id: {
      type: Number, // numeric _id
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    countryid: {
      type: Number, // numeric _id
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);