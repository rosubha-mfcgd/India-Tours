const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { phoneSchema } = require("./common/Phone");

// ---------------- User Schema
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Number, // numeric ID
      unique: true,
      index: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    phones: {
      type: [],
      ref: "Phone",
      default: [],
    },
    roleID: { type: Number, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

// ---------------- Compound unique index (optional)
// For example, ensure username + email is unique together
userSchema.index({ username: 1, email: 1 }, { unique: true });

// ---------------- Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ---------------- Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
