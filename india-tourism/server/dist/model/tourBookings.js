"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourBookingModel = void 0;
const mongoose_1 = require("mongoose");
const tourBookingSchema = new mongoose_1.Schema({
    tourManagerId: {
        type: String,
        required: true
    },
    tourId: {
        type: Number,
        ref: "Tour",
        required: true,
    },
    persons: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
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
    amountPaid: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "INR",
    },
    payment: {
        paymentId: String,
        status: String,
        cardLast4: String,
        method: {
            type: String,
            default: "card",
        },
    },
    status: {
        type: String,
        enum: ["CONFIRMED", "FAILED"],
        default: "CONFIRMED",
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
//export const TourBookingModel = model<ITourBookings>('TourBookings',tourBookingSchema);
exports.TourBookingModel = (0, mongoose_1.model)('Bookings', tourBookingSchema);
