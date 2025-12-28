const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  startTime: { type: Date, required: true },
  expiresIn: { type: Date, required: true },
});

module.exports = mongoose.model("Token", TokenSchema);
