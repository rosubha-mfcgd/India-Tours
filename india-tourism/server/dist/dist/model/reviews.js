"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    tourOperatorId: {
        type: Number,
        ref: "User",
        required: true,
    },
    reviews: {
        type: String,
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
