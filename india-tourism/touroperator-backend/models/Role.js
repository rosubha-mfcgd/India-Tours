const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleID: { type: Number, required: true, unique: true },
  roleName: { type: String, required: true }
});

module.exports = mongoose.model("Role", roleSchema);
