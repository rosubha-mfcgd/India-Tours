const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,   // numeric role ID
      unique: true,
      index: true,
    },

    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
