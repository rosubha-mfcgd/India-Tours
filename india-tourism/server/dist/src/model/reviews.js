"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    tourOperatorId: {
        type: Number,
        ref: "User",
        required: true,
        default: 0,
        set: v => (Number.isNaN(v) ? 0 : v) // Prevents NaN from breaking the cast
    },
    reviews: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: String,
    validReview: String,
    reviewDate: {
        type: Date,
        required: true
    }
});
exports.ReviewModel = (0, mongoose_1.model)('Reviews', reviewSchema);
