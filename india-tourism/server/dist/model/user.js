"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    signedUpFlag: { type: String, required: true },
    mobile: { type: String },
    emailID: { type: String },
    otp: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    zipcode: { type: String },
    points: { type: Number },
    preference: { type: [] },
    tourmanagerId: { type: String }
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
