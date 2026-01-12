import { ITourOperator } from "../repository/AppEntityState";
import { Schema, model } from 'mongoose';
const bcrypt = require("bcryptjs");

// ---------------- User Schema
const tourOperatorSchema = new Schema<ITourOperator>(
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
    roleID: { type: Number, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

// ---------------- Compound unique index (optional)
// For example, ensure username + email is unique together
tourOperatorSchema.index({ username: 1, email: 1 }, { unique: true });

// ---------------- Compare password method
tourOperatorSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const TourOperatorModel = model<ITourOperator>("User", tourOperatorSchema);
