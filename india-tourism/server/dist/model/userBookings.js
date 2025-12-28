"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBookingModel = void 0;
const mongoose_1 = require("mongoose");
const userBookingSchema = new mongoose_1.Schema({
    tourManagerId: {
        type: String
    },
    bookingId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    fromLocation: {
        type: String,
        required: true
    },
    destLocation: {
        type: String,
        required: true
    },
    travelMode: {
        type: String,
        required: true
    },
    hotelType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    package_cost: {
        type: Number,
    },
    touristData: {
        type: [],
        required: true
    },
    reviews: {
        type: []
    }
});
exports.UserBookingModel = (0, mongoose_1.model)('UserBookings', userBookingSchema);
