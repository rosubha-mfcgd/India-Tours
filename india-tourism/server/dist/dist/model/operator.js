"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourOperatorModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
// ---------------- User Schema
const tourOperatorSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
// ---------------- Compound unique index (optional)
// For example, ensure username + email is unique together
tourOperatorSchema.index({ username: 1, email: 1 }, { unique: true });
// ---------------- Compare password method
tourOperatorSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
};
exports.TourOperatorModel = (0, mongoose_1.model)("User", tourOperatorSchema);
