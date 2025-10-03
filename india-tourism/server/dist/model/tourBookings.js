"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourBookingModel = void 0;
const mongoose_1 = require("mongoose");
const tourBookingSchema = new mongoose_1.Schema({
    tourManagerId: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    bookingId: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    domesticOrInternational: {
        type: String,
        required: true
    },
    package_cost: {
        type: Number,
        required: true
    },
    primarybookings: {
        type: [],
        required: true
    },
    dependantbookings: {
        type: [],
        required: true
    },
    reviews: {
        type: []
    }
});
exports.TourBookingModel = (0, mongoose_1.model)('TourBookings', tourBookingSchema);
